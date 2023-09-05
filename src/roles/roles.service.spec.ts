import { RolesService } from './roles.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './schemas/role.schema';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateRoleDto } from './dtos/create-role.dto';

describe('RolesService', () => {
  let rolesService: RolesService;
  let model: Model<Role>;
  const mockCreateRoleDto: CreateRoleDto = {
    role: 'member',
  };

  const mockRole: Role = {
    _id: '64d019d97ce88a141ace76a8' as unknown as mongoose.Schema.Types.ObjectId,
    role: 'member',
  };

  const mockRoleRepo = {
    create: jest.fn((dto) => {
      return mockRole;
    }),
    find: jest.fn(),
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const rolesModuleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role.name),
          useValue: mockRoleRepo,
        },
      ],
    }).compile();
    rolesService = rolesModuleRef.get<RolesService>(RolesService);
    model = rolesModuleRef.get<Model<Role>>(getModelToken(Role.name));
  });

  it('should be defined', () => {
    expect(rolesService).toBeDefined();
  });

  it('should create new role', () => {
    expect(rolesService.createRole(mockCreateRoleDto)).toEqual(mockRole);
  });
});
