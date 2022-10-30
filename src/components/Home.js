import './Styles.css'
import logo from '../assets/pokechan_logo.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

    // state to save searchQuery
    const [data, setData] = useState({
        search: {
            searchQuery: '',
            placeholder: 'Search pokemon ..',
            selected: '',
            urlSelected: ''
        },
        database: {
            nameList: null,
            filteredName: null,
            details: ''
        },
        api: {
            request: '',
            response: {
                status: 0,
                message: '',
            }
        }
    })


    // fetch request to pokemon api
    // const axios = require('axios').default
    const getPokemonList = async (props) => {
        try {
            const res = await axios.get(props)
            setData({ ...data, 'database': { ...data.database, 'nameList': res.data.results } })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    // useEffect to start fetch API at start
    useEffect(() => {
        getPokemonList(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`)
    }, [])

    // useEffect to refresh the state
    useEffect(() => {
        // refresh the state
        const filterPokemonName = data.database?.nameList?.filter((object) => {
            return object.name.toLowerCase().includes(data.search?.searchQuery?.toLowerCase())
        })

        setData({ ...data, 'database': { ...data.database, 'filteredName': filterPokemonName } })

    }, [data.search.searchQuery])


    // useEffect to refresh state
    useEffect(() => {
        // refresh
        console.log(data)
    }, [data.database.nameList, data.database.filteredName, data.search.selected, data.search.urlSelected])


    const SearchResultRender = () => {
        const isSearchQuery = data.search.searchQuery
        return (
            <div className='list_container_column'>
                {isSearchQuery ? data.database?.filteredName?.map((pokemon) => {
                    return (
                        <Link
                            to={`/${pokemon.name}`}
                            id='searchResults'
                            key={pokemon.name}
                            className='list_item_column'
                            data-name={pokemon.name}
                            data-url={pokemon.url}
                            onClick={(e) => setData({ ...data, 'search': { ...data.search, 'selected': e.currentTarget.getAttribute('data-name'), 'urlSelected': e.currentTarget.getAttribute('data-url') } })} >
                            <p className='font_medium' style={{ 'padding': '4px 8px' }}>
                                {pokemon.name}
                            </p>
                        </Link>
                    )
                }) : null}
            </div>

        )
    }

    return (
        <div className='root_column' style={{ 'height': '100vh' }}>
            <div className='root_column' style={{ 'height': 'auto' }}>
                <div className='root_column'>
                    <img src={logo} className='logo' />
                    Simple Pokemon Database
                </div>
                <br />
                <br />
                <div className='root_column' style={{ 'height': 'auto', 'width': '256px' }}>
                    <input
                        type='search'
                        onChange={(e) => { setData({ ...data, 'search': { ...data.search, 'searchQuery': e.target.value } }) }}
                        placeholder={data.search?.placeholder} />
                    <SearchResultRender />
                </div>
                <br />
                or
                <br />
                <br />
                <span className='span_button'>Show all pokemon list </span>
            </div>
        </div>
    )
}

export default Home