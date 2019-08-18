import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

class Libro extends Component {

  state = {
    codigo: '',
    nombre: '',
    autor: '',
    cantidad: '',
    libros: [],
    botones: false
  }

  componentDidMount(){
    this.getLibros();
  }


  componentDidUpdate(){
    if(this.props.add){

      const data = {
        codigo: this.state.codigo,
        nombre: this.state.nombre,
        autor: this.state.autor,
        cantidad: this.state.cantidad
      };

      axios.post(`http://localhost:3000/libro`, data)
      .then(res => {
        alert("El libro fue creado exitosamente!");
        this.getLibros();
        this.props.noAdd();
        console.log(res);
        this.setState({
          codigo: '',
          nombre: '',
          autor: '',
          cantidad: ''
        });
      });
      
    }
  }

  getLibros = () => {
    axios.get('http://localhost:3000/libro')
      .then(res => {
        const libros = res.data.libros;
        this.setState({
          libros
        });
        console.log(libros);
      })
  }

  onDelete = (codigo, nombre) => {
    if(window.confirm(`¿Desea eliminar el libro ${nombre}?`)){
      axios.delete(`http://localhost:3000/libro/${codigo}`)
        .then(()=> {
          this.getLibros();
        })
    }
  }

  onEdit = (codigo, nombre, autor, cantidad) => {
    this.setState({
      codigo: codigo,
      nombre: nombre,
      autor: autor,
      cantidad: cantidad,
      botones: true
    });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  hiddenBotones = () => {
    this.setState({
      codigo: '',
      nombre: '',
      autor: '',
      cantidad: '',
      botones: false
    });
    console.log("hidden");
  }

  onSubmit = (e) =>{
    e.preventDefault();

    const data = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      autor: this.state.autor,
      cantidad: this.state.cantidad
    };

    axios.put(`http://localhost:3000/libro/${this.state.codigo}`, data)
    .then(res => {
      alert("Se ha modificado un libro exitosamente");
      this.getLibros();
    })

  }

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.onSubmit} noValidate autoComplete="off">
          <TextField
            id="codigo"
            name="codigo"
            label="Codigo"
            style={{    marginLeft: 10+'px', width: 200}}
            value={this.state.codigo}
            onChange={this.onChange}
            margin="normal"
          />
          <TextField
            id="nombre"
            name="nombre"
            label="Nombre"
            style={{    marginLeft: 10+'px', width: 200}}
            value={this.state.nombre}
            onChange={this.onChange}
            margin="normal"
          />
          <TextField
            id="autor"
            name="autor"
            label="Autor"
            style={{    marginLeft: 10+'px', width: 200}}
            value={this.state.autor}
            onChange={this.onChange}
            margin="normal"
          />
          <TextField
            id="cantidad"
            name="cantidad"
            label="Cantidad"
            style={{    marginLeft: 10+'px', width: 200}}
            value={this.state.cantidad}
            onChange={this.onChange}
            margin="normal"
          />
          {this.state.botones ? <div><Button type="submit" variant="outlined" color="primary" style={{marginLeft:5+'px'}} >Guardar cambios</Button><Button variant="outlined" color="secondary" style={{marginLeft:5+'px'}}>Cancelar</Button></div>:''}
        </form>
        <br />
        <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Codigo</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Autor</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
        
          <TableBody>
            {this.state.libros.map(row => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.codigo}</TableCell>
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.autor}</TableCell>
                <TableCell align="center">{row.cantidad}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="primary" style={{marginLeft:5+'px'}} onClick={() => this.onEdit(row.codigo, row.nombre, row.autor, row.cantidad)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" style={{marginLeft:5+'px'}} onClick={()=>this.onDelete(row.codigo, row.nombre)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Libro;