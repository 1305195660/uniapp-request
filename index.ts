
type Base = {
    baseUrl?:string,
    timeOut?:number | 6000,
    headers?:object
  }
  const uniHttp = {
    setBase(base:Base){
  const httpInterceptor = {
    invoke(options:UniApp.RequestOptions){
      //判断是否需要拼接地址
      if(!options.url.startsWith('http')){
        options.url = base.baseUrl + options.url
      }
      options.timeout = base.timeOut
      options.header = {
        ...options.header,
        //请求头标识
        ...base.headers
      }
    }
  }
  uni.addInterceptor('request',httpInterceptor)
  uni.addInterceptor('uploadFile',httpInterceptor)
    },
    setInterceptor(f1:Function,f2:Function,f3:Function){
     const http = (options:UniApp.RequestOptions)=>{
        return new Promise((resolve,reject)=>{
          uni.request({
            ...options,
            success(res){
              if(res.statusCode>=200 && res.statusCode<300){
                //响应状态码为2xx后的操作
                f1(res)
                resolve(res.data)
              }else{
                //响应状态码为2xx以外的操作
                f2(res)
                reject(res)
              }
            },
            fail(err){
              f3(err)
             uni.showToast({
               icon: 'none',
               title: '网络错误，换个网络试试',
               })
             reject(err)
            }
          })
        })
    }
      return http
  }
  }
  export default uniHttp
  
  