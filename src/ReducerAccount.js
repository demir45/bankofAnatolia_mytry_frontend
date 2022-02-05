//* store: Global olarak saklamak istediğimiz verileri oluşturduğumuz depo alanı
//* reducer: Global verileri güncellediğimiz fonksiyonlar bütünü
//* provider: Component’lerimizi sarmallayan (bir nevi yöneten) context bileşeni

//! state (State global olarak oluşturduğumuz state’lerin ta kendisi)
//! action ( bir fonksiyona bir parametre göndereceksek -  action.parametreADI)
const reducerAccount = (state, action) => {
	switch (action.type) {
		case 'USER_ACCOUNTS':
			return { ...state, accounts: action.item };
		case 'USER_TRANSACTIONS':
			return { ...state, transactions: action.item };
		default:
			return state;
	}
};

export default reducerAccount;
