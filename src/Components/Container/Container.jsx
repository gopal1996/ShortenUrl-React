import React, {Component} from 'react'

class Container extends Component {
    constructor() {
        super();
        this.state = {
            inputValue : ""
        }

    }

    handleEvent = event => {
        let {value} = event.target
        this.setState({
            inputValue: value,
            shortUrl: ""
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        const data = { inputurl: this.state.inputValue}

        fetch("http://localhost:5000/generate/url",{
            method: "post",
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                shortUrl: result
            })
        })

        
        
    }

    render() {

        return (
            <div className="container text-center" style={{height: "90vh"}}>
                <div className="row h-100">
                    <div className="col-md-12 my-auto">
                    <div className="card">
                        <div className="card-body" style={{backgroundColor: "#eee"}}>
                            <h5 className="card-title">URL Shorten</h5>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="InputUrl">Enter your URL:</label>
                                    <input type="text" 
                                    className="form-control" 
                                    id="InputUrl" 
                                    name="inputurl" 
                                    value={this.state.inputValue} 
                                    onChange={this.handleEvent} />
                                    
                                </div>
                                <button type="submit" className="btn btn-primary">Generate</button>
                            </form>
                        </div>
                        <div className={this.state.shortUrl ? `card-footer bg-success text-white border-success` : "card-footer d-none"}>
                            <b>Short Url Generated:</b> {this.state.shortUrl ? ` ${this.state.shortUrl }` : ""}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Container