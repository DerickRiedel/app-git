import React, {useState} from 'react';
import './stylesInput.css'

function Input(){
    const [user, setUser] = useState('');
    const [repList, setRep] = useState([]);
    const [status, setStatus] = useState('Digite o nome de um usuário do github para retornar os repositórios');

    async function addRep (user) {
        var path = `https://api.github.com/users/${user}/repos`;
        
        try {
            const res = await fetch(path);
            setStatus('Procurando..')
            const response = await res.json();
            setStatus('Procurando....')
            setRep([...response]);    
            setStatus('Pronto')
        } catch (error) {
            setRep([error]);
            setStatus('Erro, usuário inexistente')
            console.error('Usuário inexistente',error)
        }
        
    }
    return(
    <>
        <form className="myForm">
            <input className="myInputText" type="text" value={user} onChange={e => setUser(e.target.value)}></input>
            <button className="myButton" type="button" onClick={() => addRep(user)}>Procurar</button>
            <p className="itemName">{status}</p>
        </form>
        {<ul className="myList">
            {
                (repList.length > 0 
                ?   repList.map((item,index) => 
                    <li className="listItems" key={index}>
                        <div className="itemName">{item.name}</div>
                        <div className="itemDesc">
                            {item.description}<br/><br/>
                            {item.language}
                        </div>
                        <a  className="itemLink" target="blank" href={item.html_url}>Link</a></li>)
                :   <li className="listItems">Nenhum Repositório encontrado</li>)
            }
        </ul>
        }
    </>
    );
}
export default Input;