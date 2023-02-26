import { Request, Response } from "express";

export const requestMock = {
  params: {},
  query: {},
  body: {},
} as Request;

export const responseMock = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;
