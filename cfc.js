class EventEmitter{
    constructor(){
        this.store = {}
        this.maxEventListeners = 6;
        this.eventCount = 0;

    }
    addEventListener(name, eventListenerFN){
        var obj = this.store[name]
        if(!this.store[name]) {
            this.store[name] = []
        }
        this.store[name].push(eventListenerFN)
        this.eventCount++
        if(this.eventCount > this.maxEventListeners){
            throw new Error("Too many event listeners", )
        }
        

    }
    emit (name, content){
        if(this.store[name]){
            this.store[name].forEach((element) => element(name, content))
        }
    }
    removeEventListener(name, eventListenerFN) {
        if(this.store[name]){
            if (!eventListenerFN){
                this.eventCount = 0
                this.store[name] = []
        } else { 
            this.store[name] = this.store[name].filter(FN => FN  !== eventListenerFN )
            this.eventCount--
        } 
        }
    }
    on(...args){
        this.addEventListener(...args)
    }
    off(...args){
        this.removeEventListener(...args)
    }
}

class Twitter extends EventEmitter {
    constructor(account){
        super()
        this.account = account
    }
    tweet(...args){
        this.emit(...args)
    }
    block(...args){
        this.removeEventListener(...args)
    }

}

var footballNews = new EventEmitter()
var twitterStream = new Twitter('account')
    

footballNews.on('ChelseaFC', onFootballNews)
footballNews.on('liverpool', onFootballNews)
footballNews.on('liverpool', onBlahNews)
footballNews.on('liverpool', onNews)
footballNews.on('Oxford', onBlahNews)
footballNews.on('Oxford', onNews)

setInterval(()=>{twitterStream.tweet ('@Trump', 'MAGA, build the wall')}, 2000)
setTimeout(()=> twitterStream.block('@Trump'), 1)


twitterStream.addEventListener('Obama', onTweet)
twitterStream.addEventListener('@Trump', onTweet)

function onTweet(Handle, tweet){
    console.log(Handle.replace('@', ''), ':', tweet.toString())
}




twitterStream.tweet('Obama', 'Buffer.allocUnsafeSlow')


footballNews.emit ('ChelseaFC', 'won 4-2')
footballNews.removeEventListener('ChelseaFC', onFootballNews)
footballNews.emit ('ChelseaFC', 'champs of the world!!!!!')
footballNews.emit ('liverpool', 'threw away the cup!')
footballNews.emit ('Oxford', 'something')
footballNews.removeEventListener('Oxford', onBlahNews)
footballNews.removeEventListener('liverpool')
footballNews.emit ('liverpool',"this is a stirng")




function onFootballNews(name, content){
    console.log("You recieved news", name, content)

}
function onNews(name, content){
    console.log("onNews", name, content)
}
function onBlahNews(name, content){
    console.log("onBlahNews", name, content)
}
