import fetchData from './fetch-data.function';

type BlockFunction = (params: any) => Promise<any>;

export type BlockFunctions = Record<string, BlockFunction>;

const blockFunctions: BlockFunctions = {
  fetchData,
};

export default blockFunctions;
