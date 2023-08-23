import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.createAcademicSemester(
      req.body
    );

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created 😊',
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'code',
      'startMonth',
      'endMonth',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AcademicSemesterService.getAllAcademicSemesters(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters retrieved 😊',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
};