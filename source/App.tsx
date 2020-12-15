import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { List } from "./scripts/components/list"


class Main extends React.Component<any, any>{
    defaultData: any
    constructor(props: any) {
        super(props);
        console.log(props);

        this.state = {
            data: this.props.data,
            defaultData: this.props.data
        }
    }
    serverSearch(data: any) {
        let url = "&Cod_country= " + data.searchCountries +
            "&producer=" + data.producer +
            "&singer=" + data.singer +
            "&vidDiska=" + data.vidDiska +
            "&format=" + data.format;
        fetch('http://localhost:8000/public/main_php_script.php/?path=Search' + url)
            .then(response => response.json())
            .then(data => {
                console.log('changeCounries', data);
                this.setState({
                    data: data,
                    defaultData: data
                });
            });
    }
    serverCreateComment(data: any) {
        console.log('serverCreateComment', data);
        fetch('http://localhost:8000/public/main_php_script.php?path=CreateComment', {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        });
    }
    sentToServer = (data: any) => {
        // console.log('sentSearchParametrs', data);

        if (data.action == 'search') {
            this.serverSearch(data);
        }
        if (data.action == 'comment') {
            this.serverCreateComment(data);
        }

    }
    searchByCharacteristics = (val: any) => {


        let arr: any = [];
        this.state.defaultData.elements.forEach(function (elem: any) {
            if (elem.Name_diska.indexOf(val) == 0) {

                arr.push(elem);

            } else {
                if (elem.Year.indexOf(val) == 0) {
                    arr.push(elem);

                } else {

                    if (elem.Price.indexOf(val) == 0) {
                        arr.push(elem);
                    }
                }
            }
        });
        if (val == "") {
            this.setState({
                data: this.state.defaultData
            });
        } else {
            this.setState({
                data: {
                    elements: arr,
                    field: this.state.data.field,
                    statistic: this.state.data.statistic
                }
            });

        }


    }
    render(): JSX.Element {
        console.log('RENDER HEREEE', this.state.data);

        return (
            <div>
                <List sentToServer={this.sentToServer} searchByCharacteristics={this.searchByCharacteristics} list={this.state.data} />
            </div >
        );
    }
}
fetch('http://localhost:8000/public/main_php_script.php?path=Default', {
    method: "POST",
    headers: {
        "content-type": "application/json; charset=UTF-8"
    },
    body: ""
}).then(function (response) {
    response.json().then(function (data) {
        ReactDOM.render(<Main data={data} />, document.getElementById('block'));
    });
})