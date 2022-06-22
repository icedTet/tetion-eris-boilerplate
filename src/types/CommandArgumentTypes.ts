/*

NAME	VALUE	NOTE
SUB_COMMAND	1	
SUB_COMMAND_GROUP	2	
STRING	3	
INTEGER	4	Any integer between -2^53 and 2^53
BOOLEAN	5	
USER	6	
CHANNEL	7	Includes all channel types + categories
ROLE	8	
MENTIONABLE	9	Includes users and roles
NUMBER	10	Any double between -2^53 and 2^53
ATTACHMENT	11	attachment object

*/
export interface BaseCommandArgument {
  name: string;
  type: number;
  description: string;
  required?: boolean;
}
export interface ChoiceArgument<K> {
  choices?: K[];
}
export interface RangeArgument {
  min_value?: number;
  max_value?: number;
}
export interface StringArgument extends ChoiceArgument<string>, BaseCommandArgument {
  type: 3;
}
export interface IntegerArgument extends ChoiceArgument<number>, RangeArgument, BaseCommandArgument {
  type: 4;
}
export interface BooleanArgument extends ChoiceArgument<boolean>, BaseCommandArgument {
  type: 5;
}
export interface UserArgument extends ChoiceArgument<boolean>, BaseCommandArgument {
  type: 6;
}
export interface ChannelArgument extends BaseCommandArgument {
  type: 7;
}
export interface RoleArgument extends BaseCommandArgument {
  type: 8;
}
export interface MentionableArgument extends BaseCommandArgument {
  type: 9;
}
export interface NumberArgument extends ChoiceArgument<number>, RangeArgument, BaseCommandArgument {
  type: 10;
}
export interface AttachmentArgument extends BaseCommandArgument {
  type: 11;
}
