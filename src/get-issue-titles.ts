import {get, RequestOptions} from 'https';

/**
 * 指定されたendpointからJSONをGETで取得する関数です。
 * @param {string} url 指定のendpoint
 * @returns {Promise} 取得したJSONをパースしたオブジェクトのPromise
 */
const getJsonFromEndPoint = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options: RequestOptions = {
      headers: {
        // This header is needed. See: https://developer.github.com/v3/#user-agent-required
        'User-Agent': 'typescript-test'
      }
    };
    get(url, options, (res) => {
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        resolve(JSON.parse(body));
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

type SortOptions = 'asc' | 'desc';

type Issue = {
  number: number,
  title: string,
  [key: string]: any
}

/**
 * 問3の関数です。
 * @param {SortOptions} [sortOrder] ソート順
 * @returns {Promise<string[]>} ソート後のタイトル一覧のPromise
 */
const getIssueTitles = async (sortOrder?: SortOptions): Promise<string[]> => {
  try {
    // データ取得
    const issues: Issue[] = await getJsonFromEndPoint('https://api.github.com/repos/facebook/react/issues?page=1&per_page=10');
    // 取得データをソート、必要なプロパティのみ抽出して返す
    return issues.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.number - b.number;
      } else if (sortOrder === "desc") {
        return b.number - a.number;
      } else {
        return 0;
      }
    }).map(issue => `${issue.number}: ${issue.title}`);
  } catch (error) {
    throw error;
  }
};

const sortOrder = process.argv[2];

if (sortOrder === undefined || sortOrder === 'asc' || sortOrder === 'desc') {
  console.log('Getting a data from API endpoint...');
  getIssueTitles(sortOrder).then(titles => {
    console.log('Get and sort issues just has been succeeded!');
    console.log('get result:');
    titles.forEach(title => console.log(title));
  }).catch(error => {
    console.log('An error has occurred, please try again.');
    console.log(`error: ${JSON.stringify(error, null, 2)}`);
  });
} else {
  console.log('Argument is wrong, please specify "asc" or "desc".');
}
