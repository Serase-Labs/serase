// Esse arquivo abriga a interface e os chamadas
// de componentes necessários para toda a
// funcionalidade de relatórios mensais.
import * as React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from "react-native";
import tailwind from "tailwind-rn";

// Componentes Internos
import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";
import IlustracaoLoading from '../comum/assets/IlustracaoLoading';
import BotaoInformacao from "../comum/components/BotaoInformacao";
import BlocoInformacao from "../comum/components/BlocoInformacao";
import TabDescricao from "../comum/components/TabDescricao";
import GraficoDespesaCategoria from "./components/GraficoDespesaCategoria";
import GraficoDespesaPadrao from "./components/GraficoDespesaPadrao";
import GraficoDespesaFrequencia from "./components/GraficoDespesaFrequencia";
import {ModalInformativa, TextoPrincipal, TextoInformativo} from "../comum/components/ModalInformativa";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";
import {useState, useEffect} from "react";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
const DICIONARIO = {
	"maior_despesa": "Maior Despesa",
    "maior_salto": "Maior Salto",
    "maior_economia": "Maior Economia"
}

export default function RelatorioMensal() {
	const { token } = useAuth();

	const [categoria, setCategoria] = useState({}); 
	const [isLoadingRelatorio, setLoadingRelatorio] = useState(true);

	const converteAnalise = analises =>{
		return Object.entries(analises).map(([titulo, valor])=>{
			return {
				titulo: (titulo in DICIONARIO)? DICIONARIO[titulo] : titulo, 
				valor
			}
		});
	}

	useEffect(() => {
		async function fetchRelatorioMensal() {
			let url = GLOBAL.BASE_URL + "/relatorio/mensal";
			console.log(url);
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setCategoria(json.conteudo);
				setLoadingRelatorio(false);
				console.log("BATATA");
			} catch (error) {
				console.log(error);
			}
		}
		fetchRelatorioMensal();
		
	}, []);


	const renderizarAnalises = ({item}) => {
		return (
			<BotaoInformacao
				titulo={item.titulo}
				valor={item.valor}
				id = {item.id}
				onPress={() => console.log(item.titulo)}
			/>
		);
	};

	if(isLoadingRelatorio){
		// Caso o relatório não tenha carregado
		return (
			<View style={tailwind("bg-white h-64")}>
				<IlustracaoLoading/>
			</View>
		);
	} else

		return (

			<View style={tailwind("bg-white flex-1")}>
				{/* Blocos de informações estáticos */}
				<View style={tailwind("flex flex-row justify-between mx-5 mb-5")}>
				<BlocoInformacao titulo="Gasto Total" conteudo={"R$"+(categoria.resumo.gasto_total*-1)} />
				<BlocoInformacao titulo="Receita Total" conteudo={"R$"+(categoria.resumo.receita_total)} />
				<BlocoInformacao titulo="Fluxo Total" conteudo={(categoria.resumo.fluxo_total>0? "+":"-")+"R$"+(categoria.resumo.fluxo_total)} />
				</View>

				{/* Blocos de informações clicáveis */}

				<View style={tailwind("border-b border-t border-gray-100 py-4")}>
					<View style={tailwind("mx-6 mb-4")}>
						<Text style={tailwind("text-lg font-bold text-gray-800")}>
							Análises
						</Text>
						<Text style={tailwind("text-base text-gray-800")}>
							Em relação ao último mês.
						</Text>
					</View>

					<FlatList
					style={tailwind("ml-4")}
					data={converteAnalise(categoria.analises)}
					renderItem={renderizarAnalises}
					horizontal={true}
					keyExtractor={(item) => item.titulo}
				/>
				</View>

				{/* Gráfico de despesa semanal */}
				<View
					style={tailwind("border-b border-t border-gray-100 py-4 px-6")}
				>
				<ModalInformativa>
					<Text style={TextoPrincipal()}>O que o gráfico de despesas por categoria indica?</Text>
					<Text style={TextoInformativo()}>Mostra o quanto você gastou em cada categoria neste mês, visualizando de forma simples em quais áreas você gasta mais mensalmente indicando onde você deve economizar. É recomendado que haja um equilíbrio de tamanho entre as suas categorias, um gráfico com uma categoria muito grande indica que deve haver uma melhor distribuição do dinheiro ou a economia do mesmo.</Text>
					<Text style={TextoPrincipal()}>O que o gráfico de despesa padrão indica?</Text>
					<Text style={TextoInformativo()}>Indica se você possui mais despesas mensais em gastos fixos ou em variáveis. Despesas fixa são as despesas mensais que não sofrem alteração de valor à medida que você o consome como Aluguel e Assinatura de Internet, já nos gastos variáveis o valor varia de acordo com o consumo do serviço, exemplo: Compras online e Alimentação. Despesas variáveis muito maiores do que as fixas indicam que você pode controlar como e com o que você gasta grande parte do seu dinheiro mensal, o inverso dessa situação indica que você deve rever quais são os gastos necessários durante o mês</Text>
					<Text style={TextoPrincipal()}>O que o gráfico de frequência indica?</Text>
					<Text style={TextoInformativo()}>Indica quais foram os dias do mês em que você fez mais movimentações. Representa um calendário, cada quadrado representa um dia do mês e a cada movimentação a cor verde se torna mais forte, portanto nos dias verdes claros foram realizadas poucas (ou nenhuma) movimentação, já nos dias verde escuro a frequência de movimentação foi maior.</Text>
				</ModalInformativa>

					<Text style={tailwind("mb-5 text-lg font-bold text-gray-800")}>
						Gráficos
					</Text>

					<TabDescricao
						conteudo="Despesas por categoria"
						descricao="Suas áreas de maior gasto este mês."
					>
						<GraficoDespesaCategoria periodo="mensal"/>
					</TabDescricao>

					<TabDescricao
						conteudo="Despesas por padrão"
						descricao="Seus gastos em despesas fixas e variáveis."
					>
						<GraficoDespesaPadrao periodo="mensal"/>
					</TabDescricao>
					<TabDescricao
						conteudo="Frequência de despesas"
						descricao="Distribuição dos seus gastos pelo mês."
					>
						<GraficoDespesaFrequencia/>
					</TabDescricao>
				</View>

				{/* Seção de redirecionamento1*/}
				<View
					style={tailwind(
						"mt-4 mb-12 mx-5 py-4 bg-gray-100 flex items-center rounded-md"
					)}
				>
					<Text
						style={tailwind(
							"my-4 text-base text-gray-500 w-64 text-center"
						)}
					>
						Veja todas as suas despesas do mês em detalhes.
					</Text>

					<View
						style={tailwind("flex flex-row w-56 justify-between mb-3")}
					>
						<TouchableOpacity
							style={[
								tailwind(
									"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
								),
								{ elevation: 2 },
							]}
							onPress={() => navigation.navigate("Receitas")}
						>
							<View style={tailwind("w-8 h-8 mb-1")}>
								<IconeReceita uso="sistema" />
							</View>
							<Text
								style={[
									tailwind("text-base text-blue-900"),
									{ fontWeight: "bold" },
								]}
							>
								Receitas
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								tailwind(
									"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
								),
								{ elevation: 1 },
							]}
							onPress={() => navigation.navigate("Despesas")}
						>
							<View style={tailwind("w-8 h-8 mb-1")}>
								<IconeDespesa uso="sistema" />
							</View>
							<Text
								style={[
									tailwind("text-base text-blue-900"),
									{ fontWeight: "bold" },
								]}
							>
								Despesas
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
}
