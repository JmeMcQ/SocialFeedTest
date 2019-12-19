class EventEmitter{
    constructor(){
        this.store = {}

    }
    subscribe(name, eventListenerFN){
        var obj = this.store[name]
        if(!this.store[name]) {
            this.store[name] = []
        }
        this.store[name].push(eventListenerFN)

    }
    publish(name, content){
        if(this.store[name]){
            this.store[name].forEach ((element) => element(name, content))
        }

    }

}
var footballNews = new EventEmitter()

footballNews.subscribe('ChelseaFC', onFootballNews)
footballNews.subscribe('liverpool', onFootballNews)
footballNews.subscribe('liverpool', onBlahNews)
footballNews.subscribe('liverpool', onNews)



footballNews.publish('ChelseaFC', 'won 4-2')
footballNews.publish('ChelseaFC', 'champs of the world!!!!!')
footballNews.publish('liverpool', 'threw away the cup!')




function onFootballNews(name, content){
    console.log("You recieved news", name, content)

}
function onNews(name, content){
    console.log("onNews", name, content)
}
function onBlahNews(name, content){
    console.log("onBlahNews", name, content)
}
