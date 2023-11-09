import axios from './axios'
import moment from "moment"

const eventMap = {
  Workout: 'workout',
  'Formal Events': 'formal',
  Meeting: 'meeting',
  Outdoor: 'workout',
  'Night Out': 'night-out',
  Causal: 'causal',
  null: 'null'
}

const typeMap = {
  Top: 'top',
  Bottom: 'bottom',
  'Full Body': 'full-body',
  Shoes: 'shoes',
  Accessories: 'accessories',
  All: 'all',
  null: 'null'
}

export const getClothByTypeEvent = async (type, event) => {
  try {
    // make type and evnnt to lower case
    const response = await axios.get(
      `/clothes/type/${typeMap[type]}/activity/${eventMap[event]}`
    )
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const getOutfitByDate = async (date) => {
  try {
    const response = await axios.get(
      `/outfit/date/${date}`
    )
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const addNewActivity = async (activity) => {
  try {
    const response = await axios.get(
      `/outfit/activity/${activity}`
    )
    return response.data.message
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const deleteActivity = async (id) => {
  try {
    const response = await axios.get(
      `/outfit/delete/${id}`
    )
    return response.data.message
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const addNewCloth = async (id, event) => {
  try {
    const response = await axios.get(
      `/outfit/addCloth/${id}/event/${event}`
    )
    return response.data.message
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const fetchCloth = async (id) => {
  try {
    const response = await axios.get(
      `/clothes/${id}`
    )
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const removeClothFromOutfit = async (id, event) => {
  try {
    const response = await axios.get(
      `/outfits/remove/event/${event}/id/${id}`
    )
    return response.data.message
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const randomGenerateClothByTypeEvent = async (type, event) => {
  try {
    // make type and evnnt to lower case
    const response = await axios.get(
      `/generate/clothes/type/${typeMap[type]}/activity/${eventMap[event]}`
    )
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const createImage = async (request) => {
  console.log("CreateImage request",request)
  console.log("CreateImage URL",request.imageUrl)
  console.log("CreateImage brand_names",request.brand_names)
  console.log("CreateImage descriptions",request.descriptions)
  console.log("CreateImage event",request.event)
  console.log("CreateImage type",request.type)
  try {
    // const response = await axios.post(
    //   '/uploadImage',
    //   `imageUrl=${request.imageUrl}&brand_names=${request.brand_names}&descriptions=${request.descriptions}&event=${request.event}&type=${request.type}`,
    // );
    const response = await axios.post(
      '/uploadImage',
      {
        imageUrl: request.imageUrl,
        brand_names: request.brand_names,
        descriptions: request.descriptions,
        event: request.event,
        type: request.type,
        time: request.time,
      },
    );
    return response;
  } 
  catch (err) {
    console.log("The creatImage is breaking")
    console.log(err.response.data)
    return err;
  }
};

const api_key = "554946298277143"
const cloud_name = "dldiferrn"
export const uploadPhotoAPI = async (imageFile) => {
  let imageUrl = '';
  const signatureResponse = await axios.get("/get-signature")
  const data = new FormData()
  data.append("file", imageFile)
  data.append("api_key", api_key)
  data.append("signature", signatureResponse.data.signature)
  data.append("timestamp", signatureResponse.data.timestamp)
  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)
    }
  })
  console.log("URL",cloudinaryResponse.data.secure_url)


  imageUrl = cloudinaryResponse.data.secure_url
  let brand_names = "Self-taken"
  let descriptions = "A cloth taken"
  let event = "causal"
  let type = "top"
  let time = moment().format("MM/DD/YYYY, HH:mm:ss");
  //11/08/2023, 21:03:25
  const dbData = {
    imageUrl,
    brand_names,
    descriptions,
    event,
    type,
    time,
  };
  console.log("dbData printout",dbData)
  console.log("url",dbData.imageUrl)
  createImage(dbData)

};
