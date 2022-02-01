import * as cheerio from 'cheerio';
import axios from 'axios';
import * as iconv from 'iconv-lite';

export const crawling = async (url: string) => {
  return await axios({ url, method: 'GET', responseType: 'arraybuffer' }).then(
    async (html: any) => {
      const content = iconv.decode(html.data, 'EUC-KR').toString();
      const $ = cheerio.load(content);
      const meta = $("meta[property='og:image']").attr('content');
      return meta;
    }
  );
};
