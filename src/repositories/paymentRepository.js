import Payment from '../schema/paymentSchema.js';
import crudRepository from './crudRepository.js';

const paymentRepository = {
  ...crudRepository(Payment),
  updateOrder: async function (orderId, data) {
    const updateDoc = await Payment.findOneAndUpdate({ orderId }, data, {
      new: true
    });
    return updateDoc;
  }
};

export default paymentRepository;
