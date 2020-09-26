import AsyncStorage from '@react-native-community/async-storage';
import { convertMonthToString, generateUniqueNumber } from '../src/utils';

export const saveDataInStorage = async (value) => {
  try {
    const date = new Date();
    const day = date.getDate();
    const month = convertMonthToString(date.getMonth()+1);
    const task = {};
    let oldTasks = await AsyncStorage.getItem('@storage_tasks');
    oldTasks = JSON.parse(oldTasks);
    oldTasks = oldTasks === null ? [] : oldTasks;

    if (oldTasks && oldTasks.length > 0){
      let newDay = true;
      for(let i=0; i < oldTasks.length; i++){
        if(oldTasks[i].title === `${day} de ${month}`){
          oldTasks[i].data.unshift({title: value, checked: false});
          newDay = false;
          break;
        }
      }

      if(newDay){
        task.index = Date.now();
        task.title = `${day} de ${month}`,
        task.data = [{title: value, checked: false}]
        oldTasks.unshift(task);
      }

      await AsyncStorage.setItem('@storage_tasks', JSON.stringify(oldTasks));
    }else{    
      task.index = Date.now();
      task.title = `${day} de ${month}`;
      task.data = [{title: value, checked: false}];
      oldTasks.push(task);
      await AsyncStorage.setItem('@storage_tasks', JSON.stringify(oldTasks));
    }
    return true
  } catch (e) {
    return false
  }
}

export const updateValueInStorage = async (value, index, section) => {
  let oldTasks = await AsyncStorage.getItem('@storage_tasks');
  oldTasks = JSON.parse(oldTasks);
  // oldTasks[section.index].data[index].checked = value;
  const realIndex = getValueById(section.index, oldTasks);
  if(realIndex != null){
    oldTasks[realIndex].data[index].checked = value;
  }
  await AsyncStorage.setItem('@storage_tasks', JSON.stringify(oldTasks));
}

export const deleteValueInStorage = async (index, section) => {
  let oldTasks = await AsyncStorage.getItem('@storage_tasks');
  oldTasks = JSON.parse(oldTasks);
  const realIndex = getValueById(section.index, oldTasks);
  if(realIndex != null){
    oldTasks[realIndex].data.splice(index,1);
    if (oldTasks[realIndex].data.length == 0 && oldTasks.length == 1)
      oldTasks = []
    await AsyncStorage.setItem('@storage_tasks', JSON.stringify(oldTasks));
  }
}

const getValueById = (id, oldTasks) => {
  let realIndexTask = null;
  for(let i=0; i < oldTasks.length; i++){
    if (oldTasks[i].index === id)
      realIndexTask = i
  }

  return realIndexTask
}