//* store: Global olarak saklamak istediğimiz verileri oluşturduğumuz depo alanı
//* reducer: Global verileri güncellediğimiz fonksiyonlar bütünü
//* provider: Component’lerimizi sarmallayan (bir nevi yöneten) context bileşeni

// export const initialState = {
// 	cart: [],
// 	recipients: [],
// 	userInfo: null,
// 	ssn: null,
// };

//! state (State global olarak oluşturduğumuz state’lerin ta kendisi)
//! action ( bir fonksiyona bir parametre göndereceksek -  action.parametreADI)
const reducerUser = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, userInfo: action.item };
		case 'LOGOUT':
			return { ...state, userInfo: action.item };
		case 'UPDATE':
			return { ...state, userInfo: action.item };
		
		default:
			return state;
	}
};

export default reducerUser;
