import * as React from 'react';
import { ComponentList } from './songContainer';

export class List extends React.Component<any, any>{
    arr_object_list: any;
    constructor(props: any) {
        super(props);
        console.log('props List constructor', props);
        this.state = {
            list: this.props.list,
            listElements: this.props.list.elements,

            searchCountries: -1,
            producer: -1,
            vidDiska: -1,
            singer: -1,
            format: -1,

        }
    }

    createList = () => {

        let arr_render: any[] = [], obj = this;
        console.log('render ,', this.state.listElements);
        // / this.props.list.elements.forEach(function (elem: any) {
        this.props.list.elements.forEach(function (elem: any) {
            // this.state.listElements.forEach(function (elem: any) {

            arr_render.push(<ComponentList sentDataComment={obj.sentComment} key={elem.Cod_diska} element={elem} />);

        });
        return <div className="content__container">{arr_render}</div>;
    }
    search = (event: any) => {
        console.log();
        let arrRes = this.props.list.filter((elem: any) => {
            console.log(elem);
            if (elem.Name_diska.indexOf(event.target.value) == 0) {
                return elem;
            }
        })
        this.setState({
            list: arrRes
        });
    }


    renderField = (arr: any) => {

        let listTeg: any[] = [];
        listTeg = arr.map((elem: any) => {
            return <li>{elem}</li>
        });
        return <ul>{listTeg}</ul>
    }
    changeCounries = (event: any) => {
        this.setState({
            searchCountries: event.target.value
        })
    }
    changeVidDiska = (event: any) => {
        this.setState({
            vidDiska: event.target.value
        })
    }
    changeProducers = (event: any) => {
        this.setState({
            producer: event.target.value
        })
    }
    changeSingers = (event: any) => {
        this.setState({
            singer: event.target.value
        })
    }
    changeFormat = (event: any) => {
        this.setState({
            format: event.target.value
        });
    }
    renderCountries = () => {
        let listTeg: any[] = [];
        listTeg.push(<option selected value='-1'>Все страны</option>);
        this.state.list.field.countries.forEach((elem: any) => {
            listTeg.push(<option value={elem.Cod_country} onChange={this.changeCounries}>{elem.Name_country}</option>)
        });
        return <select className="search__select" onChange={this.changeCounries}>{listTeg}</select>
    }
    renderProducers = () => {
        let listTeg: any[] = [];
        listTeg.push(<option selected value='-1'>Все продюссеры</option>);
        this.state.list.field.producers.forEach((elem: any) => {
            listTeg.push(<option value={elem.Cod_producer} onChange={this.changeProducers}>{elem.Name_producer}</option>);
        });
        return <select className="search__select" onChange={this.changeProducers}>{listTeg}</select>
    }
    renderVidDiska = () => {
        let listTeg: any[] = [];
        listTeg.push(<option selected value='-1'>Все виды</option>);
        this.state.list.field.vid_diska.forEach((elem: any) => {
            listTeg.push(<option value={elem.Cod_vida_diska} onChange={this.changeVidDiska}>{elem.Name_vida}</option>);
        });
        return <select className="search__select" onChange={this.changeVidDiska}>{listTeg}</select>
    }
    renderSingers = () => {
        let listTeg: any[] = [];
        listTeg.push(<option selected value='-1'>Все исполнители</option>);
        this.state.list.field.singers.forEach((elem: any) => {
            listTeg.push(<option value={elem.Cod_singer} onChange={this.changeCounries}>{elem.Name_singer}</option>);
        });
        return <select className="search__select" onChange={this.changeSingers}>{listTeg}</select>
    }
    renderFormats = () => {
        let listTeg: any[] = [];
        listTeg.push(<option selected value='-1'>Все форматы</option>);
        this.state.list.field.formats.forEach((elem: any) => {
            listTeg.push(<option value={elem.Cod_formata} onChange={this.changeCounries}>{elem.Vid_formata}</option>);
        });
        return <select className="search__select" onChange={this.changeFormat}>{listTeg}</select>
    }
    sentComment = (comment: any) => {


        comment.action = "comment";
        this.props.sentToServer(comment);
    }
    sentSearchParametrs = () => {
        console.log('sentSearchParametrs', this.state);
        let data: any = this.state;
        data.listElements = [];
        data.action = "search";
        this.props.sentToServer(data);
        // this.createRequest("search");

    }
    createRequest = (action: string) => {
        let data: any = this.state;
        data.listElements = [];
        data.action = action;
        this.props.sentToServer(data);
    }


    renderFieldSearch = () => {
        let arrField, obj: any = this;
        return (
            <div className="contents__search">
                {this.renderCountries()}
                {this.renderProducers()}
                {this.renderVidDiska()}
                {this.renderFormats()}
                {this.renderSingers()}

                <input type='button' className="search__startAction" value="Search" onClick={this.sentSearchParametrs} />
            </div>
        );
    }
    SearchByCharact = (event: any) => {
        let arr: any = [];
        let val = event.target.value;
        this.props.searchByCharacteristics(event.target.value);

        // this.setState({ listElements: arr });
    }
    renderSearchByCharact = () => {
        return (
            <div className="content__searchByCharact">
                <label> <span className="searchByCharact__label">Поиск (год/цена/название)</span><input type="text" placeholder='Харрактеристика альбома' className="searchByCharact__input" onChange={this.SearchByCharact} /></label>
            </div>
        );
    }
    renderStatistic() {
        let arrRes = this.props.list.statistic.map((elem: any) => {
            return <div className="content__statistic_row">
                <span>{elem.title} - </span> <span>{elem.value}</span>
            </div>
        });
        return <div className="content__statistic">
            <br />
            <h3>Интересные фанты</h3>
            {arrRes}
        </div>
    }
    render(): JSX.Element {
        return (
            <div>
                {this.renderFieldSearch()}

                {this.renderStatistic()}
                {this.renderSearchByCharact()}
                {this.createList()}
            </div >
        );
    }
}
