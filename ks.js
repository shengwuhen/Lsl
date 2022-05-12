auto.waitFor();
let times = rawInput("请输入要自动刷的视频次数：","1500")  //用户设置刷视频的个数，默认1500
let width = device.width;
let height = device.height;
setScreenMetrics(width, height);                        //等比例适配屏幕坐标
console.show()                  						//显示悬浮窗（需要先打开悬浮窗权限）
sleep(100);
console.setSize(width/2, height/3);                     //设置窗口大小
app.launch("com.kuaishou.nebula");  				    //打开快手极速版
sleep(5000);    										//等待应用打开
console.log("准备就绪！");
toast("ready!");
log("开始快手极速版")

/*核心部分开始*/
var i = 0;
var k = 0;
while(i < times){
    /*定义随机坐标*/
    let bottomX = width / 2 - (Math.floor(Math.random() * 50) + 1);
    let bottomY = height - (Math.floor(Math.random() * 30) + height/7);
    let topX = width / 2 - (Math.floor(Math.random() * 50) + 1);
    let topY = height/7 + (Math.floor(Math.random() * 20) + 1);
    /*定义随机时间间隔*/  
    duration = (Math.floor(Math.random() * 1) + 1) *600;
    sleep((Math.floor(Math.random() * 2) + 1) * 1000);

	if (!findIncomeIcon()){
		nextV2(bottomX, bottomY, topX, topY,duration);
		log("图片|直播，下一个");
		k = k + 1;
		if(k - i > 5){
			log("出意外了");
			break;
		}
		continue;
	}

	if (randd(100)){
	 	nextV2(bottomX, bottomY, topX, topY,duration);
	 	log("不感兴趣，下一个");
		continue;
	}
	nextV8(bottomX, bottomY, topX, topY,duration);
	randlike(80);
	i = i + 1;
	k = i;
	log("进度："+ times + "/" + i);
	
	if (randd(90)){
		lookback(bottomX, bottomY, topX, topY,duration);
	 	log("上个好看，再看一遍");
	 	randlike(10);
	 	nextV8(bottomX, bottomY, topX, topY,duration);
	 	nextV2(bottomX, bottomY, topX, topY,duration);
	 }
	}
/*核心部分结束 */
/*退出程序 */
// console.hide();
home();//回到首页
device.vibrate(1000);

/*--------------- */
/*8s 下滑*/
function nextV8(x1, y1, x2, y2, duration){
	delayTime =(Math.floor(Math.random() * 2) + 4) * 1000;         //这里设置每个视频的观看时间为 10-12 秒之间
    sleep(delayTime);
    swipe(x1, y1, x2, y2, duration);
}
/*5s 上滑*/
function lookback(x1, y1, x2, y2, duration){
	sleep((Math.floor(Math.random() * 1) + 1) * 1000);
	nextV2(width * 4/5, y2, x2, y1, duration);
}
/*3s 下滑*/
function nextV2(x1, y1, x2, y2, duration){
	sleep((Math.floor(Math.random() * 1) + 1) * 1000);
	swipe(x1, y1, x2, y2, duration);
}
/*点赞*/
function clicklike(){
	sleep((Math.floor(Math.random() * 1) + 1) * 500);
	click(width / 2 + (Math.floor(Math.random() * 3) + 1), height / 2 + (Math.floor(Math.random() * 3) + 1));
	sleep(Math.floor(Math.random() * 50) + 50);
    click(width / 2 + (Math.floor(Math.random() * 3) + 1), height / 2 + (Math.floor(Math.random() * 3) + 1));
    sleep((Math.floor(Math.random() * 1) + 1) * 500);
    log("点个赞");
}
/*随机点赞*/
function randlike(x){
	if(randd(x)){
	clicklike();
	}
}
/*查找收入红包的图标，是收益中的返回true 否则返回false*/
function findIncomeIcon(){
	if (text('翻倍中').exists()){
		return true;
	}
	return false;
}
/*随机概率函数*/
function randd(x){
	j = random(1,x);
	if (j == 1){
		return true;
	}
	return false;
}