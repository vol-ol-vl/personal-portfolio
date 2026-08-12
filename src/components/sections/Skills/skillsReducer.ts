import type {Skill} from '../../../types/skill';

type SkillAction = 
    | {
        type: 'addSkill';
        skill: Skill;
    }
    | {
        type: 'deleteSkill';
        skillId: number;
    }
    | {
        type: 'updateSkill';
        skillId: number;
        skillName: string;
    };

export const skillsReducer = (
    state: Skill[],
    action: SkillAction
) => {
    switch (action.type) {
        case 'addSkill':
            return [...state, action.skill];
        case 'deleteSkill': 
            return state.filter(
                skill => skill.id !== action.skillId
            );
        case 'updateSkill':
            return state.map(skill =>
                skill.id === action.skillId
                    ? {...skill, name: action.skillName}
                    : skill
            );
        default: 
            return state;
    }
};