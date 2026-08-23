"""add tokens_valid_after to users

Revision ID: 5a7b9c1d3e5f
Revises: 4f6a8b0c2d3e
Create Date: 2026-08-22 17:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '5a7b9c1d3e5f'
down_revision: Union[str, None] = '4f6a8b0c2d3e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'users',
        sa.Column('tokens_valid_after', sa.DateTime(timezone=True), nullable=True),
    )


def downgrade() -> None:
    op.drop_column('users', 'tokens_valid_after')
