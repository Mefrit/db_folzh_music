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
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    var ComponentList = /** @class */ (function (_super) {
        __extends(ComponentList, _super);
        function ComponentList(props) {
            var _this = _super.call(this, props) || this;
            _this.sentComment = function () {
                var arrComm = _this.state.comments;
                arrComm.push({
                    Cod_diska: _this.props.element.Cod_diska,
                    Id_comment: -1,
                    value: _this.state.commentValue
                });
                _this.setState({
                    comments: arrComm
                });
                _this.props.sentDataComment({
                    cod_diska: _this.props.element.Cod_diska,
                    commentValue: _this.state.commentValue
                });
            };
            _this.changeComment = function (event) {
                _this.setState({
                    commentValue: event.target.value
                });
            };
            _this.createComments = function () {
                var arr = "";
                if (typeof _this.state.comments != 'undefined') {
                    arr = _this.state.comments.map(function (elem) {
                        return React.createElement("div", { className: "containerSong_comment" },
                            React.createElement("span", { className: 'comment__user' }, "\u0410\u043D\u043E\u043D\u0438\u043C: "),
                            elem.value);
                    });
                }
                return arr;
            };
            _this.state = {
                comments: _this.props.element.comments,
                commentValue: ""
            };
            return _this;
        }
        ComponentList.prototype.render = function () {
            return (React.createElement("div", { className: "songContainer" },
                React.createElement("h3", null, this.props.element.Name_diska),
                React.createElement("p", { className: "" },
                    "\u0413\u043E\u0434 ",
                    this.props.element.Year),
                React.createElement("p", null,
                    "\u0426\u0435\u043D\u0430 ",
                    this.props.element.Price),
                React.createElement("div", { className: "\u0441ontainerSong_commentsField" },
                    React.createElement("div", { className: "\u0441ontainerSong_commentsContainer" }, this.createComments()),
                    React.createElement("div", { className: "\u0441ontainerSong__inputs" },
                        React.createElement("input", { type: "text", onChange: this.changeComment, className: "songContainer__textarea", placeholder: '\u0417\u0430\u043F\u0438\u0441\u044C' }),
                        React.createElement("input", { type: "button", onClick: this.sentComment, className: "songContainer__createComment", value: '\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C' })))));
        };
        return ComponentList;
    }(React.Component));
    exports.ComponentList = ComponentList;
});
