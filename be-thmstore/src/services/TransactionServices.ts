import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Customer } from "../entity/Customer";
import { Product } from "../entity/Product";
import { Transaction } from "../entity/Transaction";
import "dotenv/config";
import * as midtransClient from "midtrans-client";
import { generateRandomNumber } from "../utils/randomNumber";
import * as crypto from "crypto"

export default new (class TransactionServices {
  private readonly TransactionRepository: Repository<Transaction> =
    AppDataSource.getRepository(Transaction);
  private readonly CustomerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);
  private readonly ProductRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  private midtransClient = new midtransClient.Snap({
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    isProduction: false,
  });

  async addTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.auth;
      const {
        status_payment,
        status_pengiriman,
        quantity,
        subtotal,
        product_id,
      } = req.body;
      const customer = this.CustomerRepository.findOne({
        where: {
          customer_id: loginSession.id,
        },
      });
      const product = this.ProductRepository.findOne({
        where: {
          product_id: product_id,
        },
      });

      if (!customer || !product)
        return res.status(404).json({
          message: "Customer or Product not found",
        });

      const transaction = this.TransactionRepository.create({
        status_payment: status_payment,
        status_pengiriman: status_pengiriman,
        quantity: quantity,
        subtotal: subtotal,
        product: product_id,
        customer: loginSession.id,
      });

      const createTransaction = await this.TransactionRepository.save(
        transaction
      );
      return res.status(200).json({
        message: "Success Create Transaction",
        code: 200,
        status: "success",
        data: createTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async payment(req: Request, res: Response): Promise<Response> {
    try {
      const { subtotal, quantity, product_id } = req.body;
      const user = await this.CustomerRepository.findOne({
        where: {
          customer_id: res.locals.auth.id,
        },
      });
      if (!user)
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      const order_id = `TRX-${generateRandomNumber()}`;
      const transactionDetail = {
        transaction_details: {
          order_id: order_id,
          gross_amount: subtotal,
        },
        // item_details: [
        //   {
        // 		product_id: product_id,
        // 		price: price,
        // 		quantity: quantity,
        // 		name: product_name,
        // 	},
        // ],

        customer_details: {
          customer_id: user.customer_id,
          email: user.email,
          full_name: user.fullname,
          phone: user.phone,
        },
        credit_card: {
          secure: true,
        },
      };

      const transactionToken = await this.midtransClient.createTransaction(
        transactionDetail
      );

      const newTransaction = this.TransactionRepository.create({
        no_transaction: order_id,
        customer: { customer_id: user.customer_id },
        product: { product_id: product_id },
        quantity: quantity,
        subtotal: subtotal,
        status_payment: "PENDING",
        status_pengiriman: "PENDING",
        snap_token: transactionToken.token,
        redirect_url: transactionToken.redirect_url
      });
      await this.TransactionRepository.save(newTransaction);
      return res
        .status(200)
        .json({
          success: true,
          redirect_url: transactionToken.redirect_url,
          token: transactionToken.token,
        });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async midtransCallback(req:Request,res:Response):Promise<Response>{
    try {


      const data = req.body
      console.log(data.transaction_status);
      
      const hash = crypto
      .createHash("sha512")
      .update(`${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest("hex")

      if(data.signature_key !== hash) return res.status(400).json({
        message: "Signature key invalid, please try again your action"
      })

    
      

      const transactionStatus = data.transaction_status
      const fraudStatus = data.fraud_sattus

      const updateTransaction = await this.TransactionRepository.findOne({
        relations: ["product"],
        where: {
          no_transaction: data.order_id
        }
      })
    
      
      const product = await this.ProductRepository.findOne({
        where: {
          product_id: updateTransaction.product.product_id
        }
      })

      if (transactionStatus == "capture") {
        if (fraudStatus == "accept") {
          
          
          updateTransaction.status_payment = "SUCCESS"
          await this.TransactionRepository.save(updateTransaction)
        }
      } else if (transactionStatus == "settlement") {
        
        updateTransaction.status_payment = "SUCCESS"
        await this.TransactionRepository.save(updateTransaction)
        product.stock = product.stock - updateTransaction.quantity
        await this.ProductRepository.save(product)
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
        ) {
      
        updateTransaction.status_payment = "FAILED"
          await this.TransactionRepository.save(updateTransaction)
      }


      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Transaction Notification Webhook Success"
      })
      
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {

      const transactions = await this.TransactionRepository.find({
        relations: ["product"]
      })    
      return res.status(200).json({
        message: "data all transaction",
        code: 200,
        status: "success",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {

      const noTransaction = req.params.noTransaction
      const {delivery_status} = req.body
      const transaction = await this.TransactionRepository.findOne({
        where: {
          no_transaction: noTransaction
        }
      })

      if(!transaction) return res.status(404).json({
        message: "Transaction Not Found"
      })

      transaction.status_pengiriman = delivery_status
      await this.TransactionRepository.save(transaction)

      return res.status(200).json({
        message: "Update Transaction",
        code: 200,
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
})();
