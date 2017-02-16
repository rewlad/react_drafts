
import ReactDOM        from 'react-dom'
import React           from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

//const App = ({items}) => <ul>{items.map(item=> <li key={item}>{item}</li>)}</ul>

/*
let items = [1,2,3]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        console.log("app")
        const del = item => {
            items = items.filter(i=>i!==item)
        }
        
        return <ul>{this.props.items.map(item=> <li key={item} onClick={ev=>del(item)}>{item}</li>)}</ul>
    }
}



const rootElement = document.createElement("div")
document.body.appendChild(rootElement)



setInterval(()=>{
    ReactDOM.render(
      <App items={items}/>,
      rootElement
    )
},3000)
*/



let containerElement = null
let contentElement = null
let prop = {box:{pos:{x:0,y:0},size:{x:0,y:0}}}

const ParentBranch = ({}) => {
    return (
        <div>
            <div style={({height:"1000px"})}/>
            <div style={({height:"200px",width:"200px",border:"1px solid red"})} ref={el=>containerElement=el}/>
            <div style={({height:"1000px"})}/>
        </div>
    )
}

const ChildBranch = React.createClass({
    mixins: [PureRenderMixin],
    render(){
        console.log("render Child")
        const box = this.props.box
        const style = box && {
            border: "1px solid blue",
            position: "absolute", //"fixed",
            left: box.pos.x+"px",
            top: box.pos.y+"px",
            width: box.size.x+"px",
            height: box.size.y+"px"
        }
        return (
            <div style={style} ref={el=>contentElement=el}/>
        )
    }
})

function elementPos(element){
    const p = element.getBoundingClientRect()
    return {
        pos: {x:p.left,y:p.top}, 
        size:{x:p.width,y:p.height}, 
        end:{x:p.right,y:p.bottom}
    }
}
function calcPos(calc){ return { x:calc("x"), y:calc("y") } }
const childRootElement = createRootElement()
const parentRootElement = createRootElement()


requestAnimationFrame(redraw)
function redraw(){
    requestAnimationFrame(redraw)
    if(containerElement && contentElement){
        const containerPos = elementPos(containerElement)
        
        const targetPos = containerPos
        const contentPos = elementPos(contentElement)
        const d = {
            pos:  calcPos(dir=>(targetPos.pos[dir] -contentPos.pos[dir] )|0),
            size: calcPos(dir=>(targetPos.size[dir]-contentPos.size[dir])|0)
        }
        if(d.pos.x||d.pos.y||d.size.x||d.size.y) {
            const box = {
                pos:  calcPos(dir=>prop.box.pos[dir] +d.pos[dir] ),
                size: calcPos(dir=>prop.box.size[dir]+d.size[dir])
            }
            prop = ({box})
        }
    }
    ReactDOM.render(<ParentBranch/>, parentRootElement)
    ReactDOM.render(<ChildBranch {...prop}/>, childRootElement)
    
    
}

function createRootElement() {
    const rootElement = document.createElement("div")
    document.body.appendChild(rootElement)
    return rootElement
}



