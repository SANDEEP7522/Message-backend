import Channel from '../schema/channelSchema.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel)
};

export default channelRepository;
