"""create demo_assessment_attempts table

Revision ID: 2d4e6f8a0b1c
Revises: 1c8d3e5a7b90
Create Date: 2026-08-22 12:50:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '2d4e6f8a0b1c'
down_revision: Union[str, None] = '1c8d3e5a7b90'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('demo_assessment_attempts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('stage', sa.String(length=16), nullable=False),
    sa.Column('score', sa.Integer(), nullable=False),
    sa.Column('total', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_demo_assessment_attempts_user_id'), 'demo_assessment_attempts', ['user_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_demo_assessment_attempts_user_id'), table_name='demo_assessment_attempts')
    op.drop_table('demo_assessment_attempts')