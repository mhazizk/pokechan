import './Styles.css'
import logo from '../assets/pokechan_logo.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PokemonDetailsPage from './PokemonDetails'



const Home = () => {

    // state to save searchQuery
    const [data, setData] = useState({
        search: {
            searchQuery: '',
            placeholder: 'Search pokemon ..',
            selected: '',
            urlSelected: null
        },
        database: {
            nameList: null,
            filteredName: null,
            pokemonDetails: null
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


    // fetch pokemon details
    const getPokemonDetails = async () => {
        console.log(data.search.urlSelected)
        try {
            const res = await axios.get(data.search.urlSelected ? data.search.urlSelected : null)
            setData({ ...data, 'database': { ...data.database, 'pokemonDetails': res.data } })
        } catch (error) {
            console.log(error)
        }
    }


    // useEffect to fetch pokemon details
    useEffect(() => {

        getPokemonDetails()

        console.log(data)
    }, [data.search.urlSelected])

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
    }, [data.database.nameList, data.database.filteredName, data.search.selected, data.database.pokemonDetails])


    const SearchResultRender = () => {
        const isSearchQuery = data.search.searchQuery
        return (
            <div className='list_container_column' style={{ 'position': 'absolute', 'top': '0', 'zIndex': '2000' }}>
                {isSearchQuery ? data.database?.filteredName?.map((pokemon) => {
                    return (
                        <span
                            to={`/pokemon/${pokemon.name}`}
                            id='searchResults'
                            key={pokemon.name}
                            className='list_item_column'
                            data-name={pokemon.name}
                            data-url={pokemon.url}
                            onClick={(e) => setData({ ...data, 'search': { ...data.search, 'searchQuery': '', 'selected': e.currentTarget.getAttribute('data-name'), 'urlSelected': e.currentTarget.getAttribute('data-url') } })} >
                            <p className='font_body' style={{ 'padding': '4px 8px' }}>
                                {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
                            </p>
                        </span>
                    )
                }) : null
                }
            </div>

        )
    }

    return (
        <>
            {/* <span className='red_circle' style={{ 'display': 'flex', 'position': 'fixed', 'top': '-500px', 'left': '-500px', 'zIndex': '1001' }} /> */}
            <span className='red_circle' style={{ 'display': 'flex', 'position': 'fixed', 'top': '-500px', 'left': '-500px', 'zIndex': '500' }} />
            <p className='font_background' style={{ 'display': 'flex', 'position': 'fixed', 'bottom': '0', 'zIndex': '2' }}>
                {data.search?.selected?.toUpperCase()}
            </p>


            <div className='root_column' style={{'background-color': '#ffcc00', 'height': `${data.search.selected ? '100%' : '100vh'}` }}>
                <div className='root_column' style={{ 'padding': '16px', 'background-color': 'transparent', 'height': 'auto', 'position': 'sticky', 'top': '0', 'zIndex': '1000' }}>
                    <div className='root_column' style={{'zIndex':''}}>
                        <img src={logo} className='logo' style={{'zIndex':''}} />
                        Simple Pokemon Database
                    </div>
                    <br />
                    <br />
                    <div className='root_column' style={{ 'height': 'auto', 'width': '256px' }}>
                        <input
                            type='search'
                            value={data.search.searchQuery}
                            onChange={(e) => { setData({ ...data, 'search': { ...data.search, 'searchQuery': e.target.value } }) }}
                            placeholder={data.search?.placeholder} />
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                            <SearchResultRender />
                        </div>
                    </div>
                    <br />
                </div>
                {/* <br />
                or
                <br />
                <br />
                <span className='span_button'>Show all pokemon list </span> */}
                <PokemonDetailsPage name={data.search.selected} details={data.database.pokemonDetails} />
            </div>
        </>
    )
}

export default Home