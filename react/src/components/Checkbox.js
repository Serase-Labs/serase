import React from "react";
import {
    Text,
    View,
} from "react-native";

import tailwind from "tailwind-rn";


const estilos = {
    checkbox: tailwind("rounded-full border-gray-400 w-5 h-5 border mr-3"),
    checkbox_check: tailwind("border-green-400 border-4"),
    containerInput: tailwind("w-64"),
};


export class Checkbox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selecionado: false,
        };
    }

    deselecionar(){
        this.setState({
            selecionado: false
        });
    }

    selecionar(){
        this.setState({
            selecionado: true
        });
    }

    handlerSelecionar(){
        if (this.state.selecionado)
            this.deselecionar();
        else
            this.selecionar();

        console.log(this.props)
    }

    render() {
        let estilo_checkbox_bola = [estilos.checkbox];

        if (this.state.selecionado){
            estilo_checkbox_bola.push(estilos.checkbox_check);
        }

        return (
            <View style={tailwind("flex-row mb-2")}>
                <View style={estilo_checkbox_bola} onClick={this.handlerSelecionar.bind(this)} />
                <View style={estilos.containerInput}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export class CheckboxControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selecionado: null,
        };
    }

    get valor(){
        return this.state.selecionado.valor;
    }

    handlerSelecionado(checkbox){
        if (this.state.selecionado && this.state.selecionado!=checkbox){
            this.state.selecionado.deselecionar();
            this.state.selecionado = checkbox;
        }
    }

    render(){
        return (
            <View>
                {this.props.children}
            </View>
        );
    }
}