import Chennal from '../schema/channelSchema.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Chennal)
};

export default channelRepository;
