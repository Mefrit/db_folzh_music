var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "react", "./songContainer"], function (require, exports, React, songContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(props) {
            var _this = _super.call(this, props) || this;
            _this.createList = function () {
                var arr_render = [], obj = _this;
                console.log('render ,', _this.state.listElements);
                // / this.props.list.elements.forEach(function (elem: any) {
                _this.props.list.elements.forEach(function (elem) {
                    // this.state.listElements.forEach(function (elem: any) {
                    arr_render.push(React.createElement(songContainer_1.ComponentList, { sentDataComment: obj.sentComment, key: elem.Cod_diska, element: elem }));
                });
                return React.createElement("div", { className: "content__container" }, arr_render);
            };
            _this.search = function (event) {
                console.log();
                var arrRes = _this.props.list.filter(function (elem) {
                    console.log(elem);
                    if (elem.Name_diska.indexOf(event.target.value) == 0) {
                        return elem;
                    }
                });
                _this.setState({
                    list: arrRes
                });
            };
            _this.renderField = function (arr) {
                var listTeg = [];
                listTeg = arr.map(function (elem) {
                    return React.createElement("li", null, elem);
                });
                return React.createElement("ul", null, listTeg);
            };
            _this.changeCounries = function (event) {
                _this.setState({
                    searchCountries: event.target.value
                });
            };
            _this.changeVidDiska = function (event) {
                _this.setState({
                    vidDiska: event.target.value
                });
            };
            _this.changeProducers = function (event) {
                _this.setState({
                    producer: event.target.value
                });
            };
            _this.changeSingers = function (event) {
                _this.setState({
                    singer: event.target.value
                });
            };
            _this.changeFormat = function (event) {
                _this.setState({
                    format: event.target.value
                });
            };
            _this.renderCountries = function () {
                var listTeg = [];
                listTeg.push(React.createElement("option", { selected: true, value: '-1' }, "\u0412\u0441\u0435 \u0441\u0442\u0440\u0430\u043D\u044B"));
                _this.state.list.field.countries.forEach(function (elem) {
                    listTeg.push(React.createElement("option", { value: elem.Cod_country, onChange: _this.changeCounries }, elem.Name_country));
                });
                return React.createElement("select", { className: "search__select", onChange: _this.changeCounries }, listTeg);
            };
            _this.renderProducers = function () {
                var listTeg = [];
                listTeg.push(React.createElement("option", { selected: true, value: '-1' }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0434\u044E\u0441\u0441\u0435\u0440\u044B"));
                _this.state.list.field.producers.forEach(function (elem) {
                    listTeg.push(React.createElement("option", { value: elem.Cod_producer, onChange: _this.changeProducers }, elem.Name_producer));
                });
                return React.createElement("select", { className: "search__select", onChange: _this.changeProducers }, listTeg);
            };
            _this.renderVidDiska = function () {
                var listTeg = [];
                listTeg.push(React.createElement("option", { selected: true, value: '-1' }, "\u0412\u0441\u0435 \u0432\u0438\u0434\u044B"));
                _this.state.list.field.vid_diska.forEach(function (elem) {
                    listTeg.push(React.createElement("option", { value: elem.Cod_vida_diska, onChange: _this.changeVidDiska }, elem.Name_vida));
                });
                return React.createElement("select", { className: "search__select", onChange: _this.changeVidDiska }, listTeg);
            };
            _this.renderSingers = function () {
                var listTeg = [];
                listTeg.push(React.createElement("option", { selected: true, value: '-1' }, "\u0412\u0441\u0435 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0438"));
                _this.state.list.field.singers.forEach(function (elem) {
                    listTeg.push(React.createElement("option", { value: elem.Cod_singer, onChange: _this.changeCounries }, elem.Name_singer));
                });
                return React.createElement("select", { className: "search__select", onChange: _this.changeSingers }, listTeg);
            };
            _this.renderFormats = function () {
                var listTeg = [];
                listTeg.push(React.createElement("option", { selected: true, value: '-1' }, "\u0412\u0441\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B"));
                _this.state.list.field.formats.forEach(function (elem) {
                    listTeg.push(React.createElement("option", { value: elem.Cod_formata, onChange: _this.changeCounries }, elem.Vid_formata));
                });
                return React.createElement("select", { className: "search__select", onChange: _this.changeFormat }, listTeg);
            };
            _this.sentComment = function (comment) {
                comment.action = "comment";
                _this.props.sentToServer(comment);
            };
            _this.sentSearchParametrs = function () {
                console.log('sentSearchParametrs', _this.state);
                var data = _this.state;
                data.listElements = [];
                data.action = "search";
                _this.props.sentToServer(data);
                // this.createRequest("search");
            };
            _this.createRequest = function (action) {
                var data = _this.state;
                data.listElements = [];
                data.action = action;
                _this.props.sentToServer(data);
            };
            _this.renderFieldSearch = function () {
                var arrField, obj = _this;
                return (React.createElement("div", { className: "contents__search" },
                    _this.renderCountries(),
                    _this.renderProducers(),
                    _this.renderVidDiska(),
                    _this.renderFormats(),
                    _this.renderSingers(),
                    React.createElement("input", { type: 'button', className: "search__startAction", value: "Search", onClick: _this.sentSearchParametrs })));
            };
            _this.SearchByCharact = function (event) {
                var arr = [];
                var val = event.target.value;
                _this.props.searchByCharacteristics(event.target.value);
                // this.setState({ listElements: arr });
            };
            _this.renderSearchByCharact = function () {
                return (React.createElement("div", { className: "content__searchByCharact" },
                    React.createElement("label", null,
                        " ",
                        React.createElement("span", { className: "searchByCharact__label" }, "\u041F\u043E\u0438\u0441\u043A (\u0433\u043E\u0434/\u0446\u0435\u043D\u0430/\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435)"),
                        React.createElement("input", { type: "text", placeholder: '\u0425\u0430\u0440\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430 \u0430\u043B\u044C\u0431\u043E\u043C\u0430', className: "searchByCharact__input", onChange: _this.SearchByCharact }))));
            };
            console.log('props List constructor', props);
            _this.state = {
                list: _this.props.list,
                listElements: _this.props.list.elements,
                searchCountries: -1,
                producer: -1,
                vidDiska: -1,
                singer: -1,
                format: -1,
            };
            return _this;
        }
        List.prototype.renderStatistic = function () {
            var arrRes = this.props.list.statistic.map(function (elem) {
                return React.createElement("div", { className: "content__statistic_row" },
                    React.createElement("span", null,
                        elem.title,
                        " - "),
                    " ",
                    React.createElement("span", null, elem.value));
            });
            return React.createElement("div", { className: "content__statistic" },
                React.createElement("br", null),
                React.createElement("h3", null, "\u0418\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0435 \u0444\u0430\u043D\u0442\u044B"),
                arrRes);
        };
        List.prototype.render = function () {
            return (React.createElement("div", null,
                this.renderFieldSearch(),
                this.renderStatistic(),
                this.renderSearchByCharact(),
                this.createList()));
        };
        return List;
    }(React.Component));
    exports.List = List;
});
