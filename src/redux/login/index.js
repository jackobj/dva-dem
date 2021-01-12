import Login from "../../api/login/login";
export default {
  namespace: "login",
  state: {},
  reducers: {},
  effects: {
    // 在一个effect中，可以使用多个put来分别调用reducer来更新状态
    //使用model共享全局信息 select 获取其他model中的state
    /**
     * 1.call(api,params)  2.call({type: 'a/logout'},params)
     * 2.put()  2.call({type: 'a/logout'},params)
     *
     */
    *submit(action, { put, call, select, race, all }) {
      const formData = yield select((state) => {
        const buyModel = state.buy;
        const context = state.context;
        const { stock } = buyModel;
        return {
          uuid: context.uuid,
          market: stock && stock.market,
          stockCode: stock && stock.code,
          stockName: stock && stock.name,
          price: String(buyModel.price),
          // 委托数量
          entrustAmount: String(buyModel.count),
          totalBalance: buyModel.totalBalance,
          availableTzbBalance: buyModel.availableTzbBalance,
          availableDepositBalance: buyModel.availableDepositBalance,
        };
      });
      // es6 实现all 请求异步任务 只有全部resolved 才能then
      const pomiseList = [Login.userlogin, Login.userLoginOut];
      const pomiseObj = new Promise();
      pomiseObj
        .all(pomiseList)
        .then(([res1, res2]) => {
          console.log(res1);
          console.log(res2);
        })
        .catch((err) => {
          //如果其中有一个
          console.log(err);
        });
      // 单独请求 result
      const result = yield call(
        "post",
        "/h5/ajax/trade/entrust_buy",
        formData,
        { loading: true }
      );
      // 单独请求 result2
      const result2 = yield call(
        "get",
        "/h5/ajax/trade/entrust_buy",
        formData,
        { loading: true }
      );
      console.log(result);
      console.log(result2);

      // all的使用   参考es6 pomise.all 的使用方法
      const param1 = {
        user_uuid: "",
      };
      const param2 = {
        user_uuid: "",
      };
      const [result3, result4] = yield all([
        call(Login.userlogin, param1),
        call(Login.userLoginOut, param2),
      ]);
      console.log(result3);
      console.log(result4);
      // race的使用 如果多个任务之间存在竞争关系，可以通过下面这种方式
      // data 是返回的这个异步请求的service 结果  timeout 是异步请求 的延迟时间  可以对比pomise.race([]) 的解释
      /**
       * Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
      下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
       */
      const { data, timeout } = yield race({
        data: call(Login.userlogin, param1),
        timeout: call(Login.userloginOut, 1000),
      });

      //跟新不同命名空间下的model  reducers 和 effects
      yield call({ type: "a/foo" });
      yield call({ type: "b/foo" });
      yield call({ type: "a/bar" });
    },
  },
};
