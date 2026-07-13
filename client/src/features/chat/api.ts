import api from "../../services/api";

export const getChatMessages = async (
  swapId: string
) => {
  const response = await api.get(
    `/chat/messages/${swapId}`
  );

  return response.data.data;
};

export const getSwapById = async (
  id: string
) => {
  const response = await api.get(
    `/chat/swap/${id}`
  );

  return response.data.data;
};