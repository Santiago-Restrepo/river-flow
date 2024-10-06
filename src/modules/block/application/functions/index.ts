import fetchData from './fetch-data.function';

type BlockFunction = (params: Record<string, any>) => Promise<object>;

export type BlockFunctions = Record<string, BlockFunction>;

const blockFunctions: BlockFunctions = {
  fetchData,
};

export default blockFunctions;
