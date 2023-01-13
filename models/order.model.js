const mongodb = require('mongodb');

const db = require('../data/database');

class Order {
	// status => pending, fulfilled, cancelled
	constructor(cart, userData, status = "pending", date, orderId) {
		this.productData = cart;
		this.userData = userData;
		this.status = status;
		this.date = new Date(date); // may be

		if (this.date) {
			this.formattedDate = this.date.toLocaleDateString("en-GB", {
				weekday: "short",
				day: "numeric",
				month: "long",
				year: "numeric",
			});
		}

		this.id = orderId;
	}

  static transformOrderDocument(orderDoc) {
    // will transform the order object into Orders instance class, making all orders alike
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

	static async findAll() {
		const orders = await db
			.getDb()
			.collection("orders")
			.find()
			.sort({ _id: -1 }) // descending order, latest on top
			.toArray();

		return this.transformOrderDocuments(orders);
	}

	static async findAllForUser(userId) {
		const uid = new mongodb.ObjectId(userId);

		const orders = await db
			.getDb()
			.collection("orders")
			.find({ "userData._id": uid })
			.sort({ _id: -1 })  
			.toArray();

		return this.transformOrderDocuments(orders);
	}

	static async findById(userId) {
		
		const order = await db
			.getDb()
			.collection("orders")
			.findOne({ _id: new mongodb.ObjectId(userId) });

		return this.transformOrderDocument(order);
	}

	save() {
		if (this.id) {
			const orderId = new mongodb.ObjectId(this.id);
      
      return db
				.getDb()
				.collection("orders")
				.updateOne({ _id: orderId }, { $set: { status: this.status } });
      // we can only update the order status i.e, pending or moved to processing or fulfilled.
		} else {
			const orderDocument = {
				userData: this.userData,
				productData: this.productData,
				date: new Date(),
				status: this.status,
			};

			return db.getDb().collection("orders").insertOne(orderDocument);
		}
	}
}


module.exports = Order;