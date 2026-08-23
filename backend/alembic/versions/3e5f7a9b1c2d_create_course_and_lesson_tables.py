"""create course and lesson tables

Revision ID: 3e5f7a9b1c2d
Revises: 2d4e6f8a0b1c
Create Date: 2026-08-22 13:10:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '3e5f7a9b1c2d'
down_revision: Union[str, None] = '2d4e6f8a0b1c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('courses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('slug', sa.String(length=64), nullable=False),
    sa.Column('stage', sa.String(length=16), nullable=False),
    sa.Column('title_id', sa.String(length=200), nullable=False),
    sa.Column('title_en', sa.String(length=200), nullable=False),
    sa.Column('description_id', sa.Text(), nullable=False),
    sa.Column('description_en', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_courses_slug'), 'courses', ['slug'], unique=True)

    op.create_table('lessons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('position', sa.Integer(), nullable=False),
    sa.Column('lesson_id', sa.String(length=16), nullable=False),
    sa.Column('optionality', sa.String(length=16), nullable=False),
    sa.Column('title_id', sa.String(length=200), nullable=False),
    sa.Column('title_en', sa.String(length=200), nullable=False),
    sa.Column('objective_id', sa.Text(), nullable=True),
    sa.Column('objective_en', sa.Text(), nullable=True),
    sa.Column('explanation_id', sa.Text(), nullable=True),
    sa.Column('explanation_en', sa.Text(), nullable=True),
    sa.Column('example_title_id', sa.Text(), nullable=True),
    sa.Column('example_title_en', sa.Text(), nullable=True),
    sa.Column('example_code', sa.Text(), nullable=True),
    sa.Column('example_explanation_id', sa.Text(), nullable=True),
    sa.Column('example_explanation_en', sa.Text(), nullable=True),
    sa.Column('mistakes_id', sa.Text(), nullable=True),
    sa.Column('mistakes_en', sa.Text(), nullable=True),
    sa.Column('exercise_title_id', sa.Text(), nullable=True),
    sa.Column('exercise_title_en', sa.Text(), nullable=True),
    sa.Column('exercise_description_id', sa.Text(), nullable=True),
    sa.Column('exercise_description_en', sa.Text(), nullable=True),
    sa.Column('exercise_hint_id', sa.Text(), nullable=True),
    sa.Column('exercise_hint_en', sa.Text(), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('course_id', 'position', name='uq_lesson_course_position')
    )
    op.create_index(op.f('ix_lessons_course_id'), 'lessons', ['course_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_lessons_course_id'), table_name='lessons')
    op.drop_table('lessons')
    op.drop_index(op.f('ix_courses_slug'), table_name='courses')
    op.drop_table('courses')