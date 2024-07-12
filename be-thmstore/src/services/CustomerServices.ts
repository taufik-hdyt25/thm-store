import { Repository } from "typeorm";
import { Customer } from "../entity/Customer";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class CustomerServices {
  private readonly CustomerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const customers = await this.CustomerRepository.find();
      return res.status(200).json({ customers });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const customers = await this.CustomerRepository.findOne({
        where: {
          customer_id: id,
        },
      });
      return res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const customer = await this.CustomerRepository.findOne({
        where: {
          customer_id: id,
        },
      });
      customer.address = data.address;
      customer.email = data.email;
      customer.fullname = data.fullname;
      customer.profile_picture = data.profile_picture;
      customer.password = data.password;
      customer.phone = data.phone
      const update = await this.CustomerRepository.save(customer);
      return res.status(200).json({
        message: "Success Update Profile",
        data:update
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const customer = await this.CustomerRepository.findOne({
        where: {
          customer_id: id,
        },
      });

      if (!customer)
        return res.status(404).json({
          message: "Data not found",
        });

      await this.CustomerRepository.delete(id);
      res.status(200).json({
        message: "Data has been successfully deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
})();
