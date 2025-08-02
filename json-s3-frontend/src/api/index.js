import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

export const fetchQuarterly = () =>
  axios.get(`${API_BASE}/quarterly-revenue`).then(res => res.data);

export const fetchBridge = () =>
  axios.get(`${API_BASE}/revenue-bridge`).then(res => res.data);

export const fetchCountry = () =>
  axios.get(`${API_BASE}/country-revenue`).then(res => res.data);

export const fetchRegion = () =>
  axios.get(`${API_BASE}/region-revenue`).then(res => res.data);

export const fetchConcentration = () =>
  axios.get(`${API_BASE}/customer-concentration`).then(res => res.data);
