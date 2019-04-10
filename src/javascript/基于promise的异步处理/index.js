// 基于这个getData实现各种异步控制
// function getData(url) {
//   return fetch(url).then(data => data.json());
// }

// function getData(url) {
//   return new Promise((resolve, reject) => {
//     console.log('mock fetch', url);
//     setTimeout(() => {
//       reject(Error('error'))
//     }, url);
//   });
// }

// 并发请求
// parallelFetch(['/api1','/api2']).then(list => console.log(list[0],list[1]))

function parallelFetch(...urls) {
  return Promise.all(urls.map(url => getData(url)));
}

// 串行请求
// serialFetch(['/api1','/api2']).then(list => console.log(list[1],list[1]))
// list[x]的值可以是exception也可以是data

function serialFetch(...urls) {
  return new Promise((resolve, reject) => {
    const values = [];
    let p = Promise.resolve();
    urls.forEach((url, index) => {
      p = p
        .then(() => getData(url))
        .then(res => (values[index] = res))
        .catch(err => (values[index] = err));
    });
    p.then(() => resolve(values));
  });
}

// 延迟请求
// delayFetch('/api1',ms).then(data => console.log('data:',data))
// 延迟ms发送请求

function delayFetch(url, delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => getData(url));
}

// 重试请求
// tryFetch('/api1', n).then(data => console.log('data':,data))
// data可以是最后一次exception，也可以是成功返回的data

function tryFetch(url, count = 1) {
  return new Promise((resolve, reject) => {
    let i = 0;
    let val;

    function makeFetch() {
      getData(url)
        .then(resolve)
        .catch(err => {
          if (i++ < count) {
            makeFetch();
          } else {
            resolve(err);
          }
        });
    }

    makeFetch();
  });
}

// 节流重试请求
// tryFetch('/api1',n,ms)
// 重试之间有间隔

// cancel 请求
// cancelFetch('/api1').cancel().then(res => console.log(res))
// res是一个异常对象， { name: 'AbortError')}
