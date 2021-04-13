<?php

function flash($message = null)
{
    $flash = app('App\Flash');

    if (func_num_args() == 0) {
        return $flash;
    }

    return $flash->success($message);
}

function user()
{
    $user = auth()->user();

    return $user;
}
