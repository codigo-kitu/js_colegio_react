import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {AlumnoMateria} from "../../ts/entity/estructura/AlumnoMateria";

import {HeaderComp} from '../../components/HeaderComp';
import {FooterComp} from '../../components/FooterComp';
import {AlertComp} from '../../components/AlertComp';

import {BuscarAlumnoMateriaComp} from '../../components/estructura/alumno_materia/BuscarAlumnoMateriaComp';
import {TablaDatosAlumnoMateriaComp} from '../../components/estructura/alumno_materia/TablaDatosAlumnoMateriaComp';
import {FormularioAlumnoMateriaComp} from '../../components/estructura/alumno_materia/FormularioAlumnoMateriaComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

function AlumnoMateriaView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const buscaralumno_materiaComp1:any = useRef();
	const formularioalumno_materiaComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Alumno Materia');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('alumno_materia_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [alumno_materias,setalumno_materias] = useState(new Array<AlumnoMateria>());
	let [alumno_materia] = useState(new AlumnoMateria()); //,setalumno_materia
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (alumno_materias1:Array<AlumnoMateria>) => {
		setalumno_materias(alumno_materias1);		
		//alumno_materias = alumno_materias1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		buscaralumno_materiaComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		buscaralumno_materiaComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		buscaralumno_materiaComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		formularioalumno_materiaComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (alumno_materia1: AlumnoMateria) => {
		formularioalumno_materiaComp1.current.handleAction_ClickTableRow(alumno_materia1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		buscaralumno_materiaComp1.current.getTodosDatos();
		formularioalumno_materiaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		buscaralumno_materiaComp1.current.getTodosDatos();
		formularioalumno_materiaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		buscaralumno_materiaComp1.current.getTodosDatos();
		formularioalumno_materiaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ELIMINADO);
		headerComp1.current.ocultarLoader();
	};
	
	const setMensajeAlerta = (tipo_mensaje:string,mensaje:string) => {
		setTipo_mensaje(tipo_mensaje);
		setMensaje(mensaje);
		
		alertComp1.current.setMensajeAlerta();
	};
	
	const funGetTodosDatos = () => {
		getTodosDatos();
	};
	
	useEffect(funGetTodosDatos, []);
	
	return (
	
	<div id="divViewGlobalalumno_materia">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<BuscarAlumnoMateriaComp ref={buscaralumno_materiaComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<TablaDatosAlumnoMateriaComp 
					module={module} controller={controller}
					alumno_materias={alumno_materias}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<FormularioAlumnoMateriaComp ref={formularioalumno_materiaComp1}
					module={module} controller={controller}
					alumno_materia={alumno_materia}
					alumno_materias={alumno_materias}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {AlumnoMateriaView};