import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EventEmitter } from 'events';

export class ComponentList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: this.props.element.comments,
            commentValue: ""
        }
    }
    sentComment = () => {

        let arrComm = this.state.comments;
        arrComm.push({
            Cod_diska: this.props.element.Cod_diska,
            Id_comment: -1,
            value: this.state.commentValue
        });
        this.setState({
            comments: arrComm
        });
        this.props.sentDataComment({
            cod_diska: this.props.element.Cod_diska,
            commentValue: this.state.commentValue
        });
    }
    changeComment = (event: any) => {
        this.setState({
            commentValue: event.target.value
        });
    }
    createComments = () => {

        let arr = "";
        if (typeof this.state.comments != 'undefined') {
            arr = this.state.comments.map(function (elem: any) {
                return <div className="containerSong_comment"><span className='comment__user'>Аноним: </span>{elem.value}</div>
            });
        }
        return arr;
    }
    render() {

        return (
            <div className="songContainer">
                <h3>{this.props.element.Name_diska}</h3>
                <p className="">Год {this.props.element.Year}</p>
                <p>Цена {this.props.element.Price}</p>

                <div className="сontainerSong_commentsField">
                    <div className="сontainerSong_commentsContainer">
                        {this.createComments()}
                    </div>
                    <div className="сontainerSong__inputs">
                        <input type="text" onChange={this.changeComment} className="songContainer__textarea" placeholder='Запись' />
                        <input type="button" onClick={this.sentComment} className="songContainer__createComment" value='Комментировать' />
                    </div>
                </div>

            </div>
        );
    }
}