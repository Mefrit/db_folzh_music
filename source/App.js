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
define(["require", "exports", "react", "react-dom", "./scripts/components/list"], function (require, exports, React, ReactDOM, list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    ReactDOM = __importStar(ReactDOM);
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main(props) {
            var _this = _super.call(this, props) || this;
            _this.sentToServer = function (data) {
                // console.log('sentSearchParametrs', data);
                if (data.action == 'search') {
                    _this.serverSearch(data);
                }
                if (data.action == 'comment') {
                    _this.serverCreateComment(data);
                }
            };
            _this.searchByCharacteristics = function (val) {
                var arr = [];
                _this.state.defaultData.elements.forEach(function (elem) {
                    if (elem.Name_diska.indexOf(val) == 0) {
                        arr.push(elem);
                    }
                    else {
                        if (elem.Year.indexOf(val) == 0) {
                            arr.push(elem);
                        }
                        else {
                            if (elem.Price.indexOf(val) == 0) {
                                arr.push(elem);
                            }
                        }
                    }
                });
                if (val == "") {
                    _this.setState({
                        data: _this.state.defaultData
                    });
                }
                else {
                    _this.setState({
                        data: {
                            elements: arr,
                            field: _this.state.data.field,
                            statistic: _this.state.data.statistic
                        }
                    });
                }
            };
            console.log(props);
            _this.state = {
                data: _this.props.data,
                defaultData: _this.props.data
            };
            return _this;
        }
        Main.prototype.serverSearch = function (data) {
            var _this = this;
            var url = "&Cod_country= " + data.searchCountries +
                "&producer=" + data.producer +
                "&singer=" + data.singer +
                "&vidDiska=" + data.vidDiska +
                "&format=" + data.format;
            fetch('http://localhost:8000/public/main_php_script.php/?path=Search' + url)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log('changeCounries', data);
                _this.setState({
                    data: data,
                    defaultData: data
                });
            });
        };
        Main.prototype.serverCreateComment = function (data) {
            console.log('serverCreateComment', data);
            fetch('http://localhost:8000/public/main_php_script.php?path=CreateComment', {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)
            });
        };
        Main.prototype.render = function () {
            console.log('RENDER HEREEE', this.state.data);
            return (React.createElement("div", null,
                React.createElement(list_1.List, { sentToServer: this.sentToServer, searchByCharacteristics: this.searchByCharacteristics, list: this.state.data })));
        };
        return Main;
    }(React.Component));
    fetch('http://localhost:8000/public/main_php_script.php?path=Default', {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: ""
    }).then(function (response) {
        response.json().then(function (data) {
            ReactDOM.render(React.createElement(Main, { data: data }), document.getElementById('block'));
        });
    });
});
