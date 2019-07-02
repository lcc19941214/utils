/**
 * @param {Promise<any>[]} promiseArr
 * @returns {Promise<any[]>}
 */
function all(promiseArr) {
  return new Promise((resolve, reject) => {
    try {
      const results = [];
      const len = promiseArr.length;
      let count = 0;
      promiseArr.forEach((prom, index) => {
        prom.then(rst => {
          results[index] = rst;
          count++;

          if (count === len) {
            resolve(results);
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function playground() {
  const p = timer =>
    new Promise((r, j) => {
      setTimeout(() => {
        r(timer);
      }, timer);
    });

  all([p(100), p(500), p(200), p(3000), p(2100)]).then(console.log);
}
