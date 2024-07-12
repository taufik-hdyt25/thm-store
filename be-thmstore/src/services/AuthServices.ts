import { Repository } from "typeorm";
import { Customer } from "../entity/Customer";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new (class AuthServices {
  private readonly CustomerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, fullname } = req.body;
      const checkEmail = await this.CustomerRepository.findOne({
        where: {
          email,
        },
      });

      if (checkEmail) {
        return res.status(400).json({
          message: "Email is already",
        });
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      const customer = this.CustomerRepository.create({
        fullname: fullname,
        email: email,
        password: passwordHashed,
        profile_picture:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      });

      const createdCustomer = await this.CustomerRepository.save(customer);
      return res.status(200).json({
        data: createdCustomer,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const customerSelected = await this.CustomerRepository.findOne({
        where: {
          email: email,
        },
      });
      if (!customerSelected)
        return res.status(404).json({
          message: "Email not found",
        });

      if (!email)
        return res.status(400).json({
          message: "Please enter a email",
        });

      // check password
      const isPasswordValid = await bcrypt.compare(
        password,
        customerSelected.password
      );

      if (!password)
        return res.status(400).json({
          message: "Please enter a password",
        });
      if (!isPasswordValid)
        return res.status(404).json({
          message: "Password wrong",
        });

      const token = jwt.sign(
        { id: customerSelected.customer_id },
        "sdfdsfdsfdsfdsfsf",
        { expiresIn: 5000000 }
      );

      return res.status(200).json({
        code: 201,
        status: "success",
        email: customerSelected.email,
        message: "Login Success",
        token,
      });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
        message: error,
      });
    }
  }
  async profileMe(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.auth;
      
      const customer = await this.CustomerRepository.findOne({
        where: {
          customer_id: loginSession.id,
        },
        relations: ["cart.product","wishlist.product","transactions.product"]
      });

      if (!customer)
        return res.status(404).json({
          message: "customer not found",
        });

      res.status(200).json({
        data: customer,
        message: "You are logged in",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
})();
