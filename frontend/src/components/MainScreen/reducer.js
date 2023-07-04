import * as actions from "./actions";
const initModel = {
    firstName: "",
    lastName: "",
    streetName: "",
    houseNumber: "",
    apartmentNumber: "",
    postalCode: "",
    dateOfBirth: new Date(),
    town: "",
    phoneNumber: "",
};
export const initSate = { list: [], isLoadeding: false };

let _globalNum = 1;
function getNextNum() {
    const t = _globalNum;
    _globalNum = _globalNum + 1;
    return t;
}



function reducer(state, action) {
    const actionsMethods = {
        [actions.actionDataLoad]: function (state, data) {
            return {
                ...state,
                list: Array.from(data, (x) => {
                    return {
                        ...x,
                        _id: getNextNum(),
                        dateOfBirth: new Date(x.dateOfBirth),
                        isChnaged: false,
                        isRemoved: false,
                    };
                }),
                isLoadeding: false,
            };
        },
        [actions.actionDelete]: function (state, data) {
            return {
                ...state,
                list: Array.from(state.list, (x) => {
                    const r = { ...x };
                    if (r._id == data.internalid) {
                        r.isRemoved = true;
                        r.isChnaged = true;
                    }
                    return r;
                }),
            };
        },
        [actions.actionAdd]: function (state, data) {
            const newList = Array.from(state.list);
            newList.push({ ...initModel, isChnaged: true, _id: getNextNum() });
            return {
                ...state,
                list: newList,
            };
        },
        [actions.actionChange]: function (state, data) {
            const newList = Array.from(state.list);
            const item = newList.find((x) => x._id == data._id);
            item[data.field] = data.value;
            item.isChnaged = true;
            return {
                ...state,
                list: newList,
            };
        },
        [actions.actionStartEdit]: function (state, data) {
            const newList = Array.from(state.list);
            const item = newList.find((x) => x._id == data.internalid);
            return {
                ...state,
                list: newList,
            };
        },
        [actions.actionEndEdit]: function (state, data) {
            const newList = Array.from(state.list);
            const item = newList.find((x) => x._id == data._id);
            for (let i = 0; i < newList.length; i++) {
                if (newList[i]._id != data._id) {
                    continue;
                }
                data.isChnaged = true;
                newList[i] = data;
            }
            return {
                ...state,
                list: newList,
            };
        },
    };

    if (actionsMethods[action.type]) {
        return actionsMethods[action.type](state, action.data);
    }
    return state||initSate;
}

export default reducer;
