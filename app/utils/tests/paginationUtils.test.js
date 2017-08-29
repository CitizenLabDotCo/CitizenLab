import { getPageNumberFromUrl } from '../paginationUtils';
import { API_PATH } from '../../containers/App/constants';

describe('getPageNumberFromUrl', () => {
  it('should return next single-digit page number if available', () => {
    const url = `${API_PATH}/ideas?page%5Bnumber%5D=2&page%5Bsize%5D=25`;
    expect(getPageNumberFromUrl(url)).toEqual(2);
  });

  it('should return next multi-digit page number if available', () => {
    const url = `${API_PATH}/ideas?page%5Bnumber%5D=11&page%5Bsize%5D=25`;
    expect(getPageNumberFromUrl(url)).toEqual(11);
  });

  it('should return null if page number is negative', () => {
    const url = `${API_PATH}/ideas?page%5Bnumber%5D=-1&page%5Bsize%5D=25`;
    expect(getPageNumberFromUrl(url)).toBeNull();
  });

  it('should return null if url is not defined', () => {
    const url = undefined;
    expect(getPageNumberFromUrl(url)).toBeNull();
  });
});
