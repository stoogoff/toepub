
export default ({ $axios, env }) => {
	$axios.setHeader('Authorization', `Bearer ${env.userToken}`)
}
