import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generarPDF = (titulo, proyectos) => {
    if((proyectos.loading || !proyectos.result) ){
        // const tipo = document.getElementById('proyecto-filtro-tipo').value
        // const periodo = document.getElementById('proyecto-filtro-periodo').value
        // const estado = document.getElementById('proyecto-filtro-estado').value
        const filtros = {
            titulo,
            // tipo,
            // periodo,
            // estado
        }
        const Proyectos = proyectos.result; 
        const json = generarJson(filtros, Proyectos);
        pdfMake.createPdf(json).open();
    }

}

const generarJson= (filtros, Proyectos) => {
    let titulo = filtros.titulo;
    let nombre = '';
    // if(filtros.tipo.length != 0){
    //     if(filtros.tipo == 'TSP'){
    //         nombre += `- Trabajos de suficiencia profesional -`
    //     }else if(filtros.tipo =='TI'){
    //         nombre += `- Trabajos de investigación -`
    //     }
    //     else{
    //         nombre += `- Tesis -`
    //     }
    // }
    // if(filtros.periodo.length != 0){
    //     nombre += `- ${filtros.periodo} -`
    // }
    // if(filtros.estado.length != 0){
    //     nombre += `- ${(filtros.estado).toLowerCase()}s -`
    // }
    let json = {
        content: [
            {
                stack: [
                    titulo,
                    {text: nombre, style: 'subheader'},
                ],
                style: 'header'
            },
            {
                style: 'pointMargin',
                table: {
                    widths: [],
                    body: []
                },
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 40]
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: 'black'
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            tableContent: {
                fontSize: 9
            },
        }
        
    }
    listarProyectos(Proyectos, json, filtros.titulo);
    return json;
}

const listarProyectos = (Proyectos, json, titulo) => {
    console.log(json.content[1].table.body);
     
    if(titulo == 'REPORTE DE PROYECTOS'){
        const head = [
            {text: 'N° de doc de sustento:', style: 'tableHeader', alignment: 'center'}, 
            {text: 'Nombre proyecto', style: 'tableHeader', alignment: 'center'},
            {text: 'Estudiantes', style: 'tableHeader', alignment: 'center'},
            {text: 'Asesor', style: 'tableHeader', alignment: 'center'}
        ]
        json.content[1].table.body.push(head)
        json.content[1].table.widths.push(100)
        json.content[1].table.widths.push(125)
        json.content[1].table.widths.push(125)
        json.content[1].table.widths.push(125)
        Proyectos.map(proyecto => {
            let alumnos = `${proyecto.student_1.last_name}, ${proyecto.student_1.first_name}`
            if(proyecto.student_2 != null){
                alumnos += `;   ${proyecto.student_2.last_name}, ${proyecto.student_2.first_name}`
            }
            if(proyecto.student_3 != null){
                alumnos += `;   ${proyecto.student_3.last_name}, ${proyecto.student_3.first_name}`
            }
            let asesor = `${proyecto.adviser.last_name}, ${proyecto.adviser.first_name}`
            const linea = [
                {text: proyecto.num_doc_support , style: 'tableContent'},
                {text: proyecto.name , style: 'tableContent'},
                {text: alumnos , style: 'tableContent'},
                {text: asesor , style: 'tableContent'},
            ]
            json.content[1].table.body.push(linea)
        })
    }
    else{
        const head = [
            {text: 'N° de doc de sustento:', style: 'tableHeader', alignment: 'center'}, 
            {text: 'Nombre proyecto', style: 'tableHeader', alignment: 'center'},
            {text: 'Estudiantes', style: 'tableHeader', alignment: 'center'},
            {text: 'Asesor', style: 'tableHeader', alignment: 'center'},
            {text: 'Jurado', style: 'tableHeader', alignment: 'center'},
            {text: 'Fecha', style: 'tableHeader', alignment: 'center'},
        ]
        json.content[1].table.body.push(head)
        json.content[1].table.widths.push(100)
        json.content[1].table.widths.push(100)
        json.content[1].table.widths.push(75)
        json.content[1].table.widths.push(75)
        json.content[1].table.widths.push(75)
        json.content[1].table.widths.push(40)
        Proyectos.map(proyecto => {

            let alumnos = '';
            let jurado = ''
            let fecha = ''
            let hora = '' 
        
            let fechaHora = date_supporting.split('T');
            fecha = fechaHora[0];
            hora = fechaHora[1].split(':');
            hora = hora[0] + ':' + hora[1]
            fecha = fecha + ' ' + hora
        
            if(adviser != undefined){asesor = `${proyecto.adviser.last_name} ${proyecto.adviser.first_name}`;}
        
            if(student_1 != null){alumnos = `${proyecto.student_1.last_name}, ${proyecto.student_1.first_name}`;}
            if(student_2 != null){alumnos += `; ${proyecto.student_2.last_name}, ${proyecto.student_2.first_name}`}
            if(student_3 != null){alumnos += `; ${proyecto.student_3.last_name} ${proyecto.student_3.first_name}`}
        
            if(jury_1 != null){jurado = `${proyecto.jury_1.last_name}, ${proyecto.jury_1.first_name}`;}
            if(jury_2 != null){jurado += `; ${proyecto.jury_2.last_name}, ${proyecto.jury_2.first_name}`}
            if(jury_3 != null){jurado += `; ${proyecto.jury_3.last_name} ${proyecto.jury_3.first_name}`}

            alumnos = `${proyecto.student_1.last_name}, ${proyecto.student_1.first_name}`
            if(proyecto.student_2 != null){
                alumnos += `;   ${proyecto.student_2.last_name}, ${proyecto.student_2.first_name}`
            }
            if(proyecto.student_3 != null){
                alumnos += `;   ${proyecto.student_3.last_name}, ${proyecto.student_3.first_name}`
            }
            asesor = `${proyecto.adviser.last_name}, ${proyecto.adviser.first_name}`
            const linea = [
                {text: proyecto.num_doc_support , style: 'tableContent'},
                {text: proyecto.name , style: 'tableContent'},
                {text: alumnos , style: 'tableContent'},
                {text: asesor , style: 'tableContent'},
                {text: jurado , style: 'tableContent'},
                {text: fecha , style: 'tableContent'},
            ]
            json.content[1].table.body.push(linea)
    
        })
    }
}



