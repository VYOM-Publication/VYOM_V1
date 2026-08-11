export enum Role {
  VISITOR = 'visitor',
  MEMBER = 'member',
  AUTHOR = 'author',
  REVIEWER = 'reviewer',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.VISITOR]: 0,
  [Role.MEMBER]: 1,
  [Role.AUTHOR]: 2,
  [Role.REVIEWER]: 3,
  [Role.EDITOR]: 4,
  [Role.ADMIN]: 5,
};

export const ALL_ROLES = Object.values(Role);
export const AUTHENTICATED_ROLES: Role[] = [
  Role.MEMBER,
  Role.AUTHOR,
  Role.REVIEWER,
  Role.EDITOR,
  Role.ADMIN,
];
