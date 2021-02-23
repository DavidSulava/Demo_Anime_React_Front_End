
const get_set_LocalStorageData = ( initState, StateKey='default_key' )=>{

	let lStorageData = JSON.parse(localStorage.getItem( StateKey ) || '{}');

	if( !Object.keys(lStorageData).length )
		localStorage.setItem(StateKey, JSON.stringify(initState));


	return  JSON.parse(localStorage.getItem( StateKey ) || '{}')
}

export default get_set_LocalStorageData;